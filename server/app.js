const express = require("express");
require("express-async-errors");

const app = express();

const morgan = require("morgan");
const cors = require("cors");

// const client = require("./elephant");

const errorHandler = require("./middleware/errorHandler");
const usersRouter = require("./routes/users");
const productRouter = require("./routes/products");
// const addItems = require("./products/products");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);

app.use(errorHandler);
module.exports = app;
