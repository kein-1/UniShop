const express = require("express");

const ordersRouter = express.Router();

const jwt = require("jsonwebtoken");
const tokenExtractor = require("../middleware/tokenExtractor");

const client = require("../elephant");

ordersRouter.get("/", tokenExtractor, async (request, response) => {
  const userToken = request.userToken;

  if (!userToken) {
    return response.status(400).send("You are not authorized here!");
  }
  const userInfo = jwt.verify(userToken, process.env.JWT_KEY);

  const { rows } = await client.query("SELECT * FROM orders WHERE user_id = $1", [userInfo.id]);

  return response.status(200).json({ data: rows });
});

module.exports = ordersRouter;
