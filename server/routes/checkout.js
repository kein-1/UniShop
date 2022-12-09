require("dotenv").config();

const express = require("express");

const checkoutRouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const tokenExtractor = require("../middleware/tokenExtractor");

const origin = "http://localhost:3000";

checkoutRouter.post("/create-checkout-session", tokenExtractor, async (request, response) => {
  const cartItems = request.body; // in front end, we passed in the cartItems
  console.log(cartItems);

  if (cartItems) {
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

    // Clear the cart. Since the cart is tracked from the backend, set it back to an empty arr
    request.session.items = [];

    // This is the session object created from Stripe API. I had multiple issues
    // with CORS and redirecting from the backend.. so I sent the URL back to the
    // front-end to do the redirecting
    response.send({ url: session.url });
  }
});

module.exports = checkoutRouter;
