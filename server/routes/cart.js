const express = require("express");

const cartRouter = express.Router();
const client = require("../elephant");

cartRouter.get("/", async (request, response) => {
  console.log(request.headers);
  console.log(request.sessionID);

  const { items } = request.session;
  if (!items) {
    return response.status(200).send("You have no items in your cart");
  }
  console.log(items);
  response.status(200).json({ cart: items });
});

cartRouter.post("/", async (request, response) => {
  const { title, quantity, price } = request.body;

  console.log(request.headers);
  console.log(request.session);
  console.log(request.sessionID);

  // If this field exists, we add the item to it
  // Otherwise we make a new field called items and add the first
  // item. The items field will be an array with each element
  // as an items object
  const { items } = request.session;
  if (items) {
    items.push({ title, quantity, price });
  } else {
    request.session.items = [{ title, quantity, price }];
  }

  response.status(201).send("Item added!");
});

module.exports = cartRouter;
