const express = require("express");

const cartRouter = express.Router();
const client = require("../elephant");

cartRouter.get("/", async (request, response) => {
  console.log(request.cookies);
  if (request.cookies.visited === "true") console.log("hey we have the cookie!");
  response.status(200).send("visited");
});

cartRouter.post("/", async (request, response) => {
  const { title, quantity, price } = request.body;
  //   console.log(title, quantity, price);
  //   console.log(request.cookies);
  //   response.status(201).send(request.sessionID);
  response.status(201).send(request.cookies);
});

module.exports = cartRouter;
