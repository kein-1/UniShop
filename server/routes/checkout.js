require("dotenv").config();

const express = require("express");

const checkoutRouter = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// const origin = "https://51mw8f-3000.preview.csb.app";
const origin = "http://localhost:3000";

checkoutRouter.post("/create-checkout-session", async (request, response) => {
  const cartItems = request.body; // in front end, we passed in the cartItems
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
    line_items,
    mode: "payment",
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cancel`,
  });

  // This is the session object created from Stripe API
  response.send({ url: session.url });
  // res.redirect(303, session.url);
});

module.exports = checkoutRouter;
