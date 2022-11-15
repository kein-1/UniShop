const express = require("express");

const productRouter = express.Router();
const client = require("../elephant");

productRouter.get("/", async (request, response) => {
  const data = await client.query("SELECT * FROM products");
  console.log(data);
  return response.status(200).json({ data: data.rows });
});

productRouter.get("/:id", async (request, response, next) => {
  response.cookie("visited", true);
  const { id } = request.params;

  // Pass in the query string and the variable itself. We use $1 etc to plug variables
  // 2nd parameter must be in an array
  // We can also pass a query object with a text and values field like in my users query
  const data = await client.query("SELECT * FROM products where id=$1", [id]);

  /*
  If the query returns nothing, we run the next() to pass it to the next middleware
  In this case it is the error handler. Passing in a parameter is the error itself
  We also create a new Error object and customize it according to our needs.
  The error object has an internal constructor which initalizes the error.message property
  which we can use in the error handling middleware because the parameter we
  pass in here will be the error object
  */
  if (data.rowCount === 0) return next(new Error("NO MATCHES"));
  console.log(data);
  return response.status(200).json({ data: data.rows });
});

module.exports = productRouter;
