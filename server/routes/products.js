const express = require("express");

const productRouter = express.Router();
const client = require("../elephant");

productRouter.get("/", async (request, response) => {
  const data = await client.query("SELECT * FROM products");
  console.log(data);
  response.status(200).json({ data: data.rows });
});

module.exports = productRouter;
