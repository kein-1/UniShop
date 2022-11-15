const express = require("express");

const cartRouter = express.Router();
const client = require("../elephant");

cartRouter.post("/", async (request, response) => {
  const { title, quantity, price } = request.body;
  console.log(title, quantity, price);

  //   response.status(201).send(request.sessionID);
  response.status(201).send(request.cookies);
});

module.exports = cartRouter;
