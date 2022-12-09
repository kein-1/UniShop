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
const checkoutRouter = require("./routes/checkout");

const origin = "http://localhost:3000";

app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    // look up how to configure this based on dev/production.
    origin: [origin],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  }), // had to configure this for cookies to send.. need to update origin when in production
);

// WHY ARE COOKIES NOT BEING SAVED IN BROWSER??
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
app.use("/api/checkout", checkoutRouter);

app.use(errorHandler);

// No real difference.. I can do the listen here or I can export the app and then
// use node's http to createServer and pass in our app

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));

module.exports = app;
