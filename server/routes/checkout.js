require("dotenv").config();

const express = require("express");

const checkoutRouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const jwt = require("jsonwebtoken");
const tokenExtractor = require("../middleware/tokenExtractor");

const client = require("../elephant");

const origin = "https://unishop-frontend.onrender.com";

checkoutRouter.post("/create-checkout-session", tokenExtractor, async (request, response) => {
  const cartItems = request.body; // in front end, we passed in the cartItems
  const userToken = request.userToken;

  // Object.keys(obj) turns it into an array with its values being the keys of the object
  if (Object.keys(cartItems).length !== 0) {
    const line_items = cartItems.map((element) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: element.title,
          images: [element.productImage],
        },
        unit_amount: element.totalPrice * 100,
      },
      quantity: element.quantity,
    }));

    // Create a session object from stripe API. This is the data that will be seen
    // in the checkout page
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      line_items,
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
    });

    if (userToken) {
      // Save this user's order into our database
      const userInfo = jwt.verify(userToken, process.env.JWT_KEY);
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      const items = cartItems.map((element) => element.title);
      const total = parseFloat(
        cartItems.reduce((prev, curr) => prev + curr.totalPrice, 0).toFixed(3),
      );

      const query = {
        text: "INSERT INTO orders(user_id,order_number, order_total, order_items) VALUES ($1,$2,$3,$4)",
        values: [userInfo.id, orderNumber, total, items],
      };

      await client.query(query);
    }

    // Clear the cart. Since the cart is tracked from the backend, set it back to an empty arr
    request.session.items = [];

    // This is the session object created from Stripe API. I had multiple issues
    // with CORS and redirecting from the backend.. so I sent the URL back to the
    // front-end to do the redirecting
    return response.send({ url: session.url });
  }
  return response.send("EMPTY CART");
});

module.exports = checkoutRouter;
