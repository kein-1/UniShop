require("dotenv").config();
const express = require("express");
require("express-async-errors");

const app = express();

const morgan = require("morgan");
const cors = require("cors");

// Parses cookies to an object to be used. This can be omitted since we are using express-session
// const cookieParser = require("cookie-parser");

// Use express sessions
const session = require("express-session");

// const client = require("./elephant");

const errorHandler = require("./middleware/errorHandler");
const usersRouter = require("./routes/users");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use(
  session({
    secret: process.env.SECRET_WORD,
    resave: false,
    saveUninitalized: true,
  }),
);

app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.use(errorHandler);
module.exports = app;
