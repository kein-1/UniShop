require("dotenv").config();
const express = require("express");
require("express-async-errors");

const app = express();

const morgan = require("morgan");
const cors = require("cors");

// Parses cookies to an object to be used. This can be omitted since we are using express-session
// const cookieParser = require("cookie-parser");

// Use express sessions and setup a session store
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const errorHandler = require("./middleware/errorHandler");
const usersRouter = require("./routes/users");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");
const ordersRouter = require("./routes/orders");

const origin = process.env.NODE_ENV === "production" ? process.env.ORIGIN_1 : process.env.ORIGIN_2;

console.log(origin);

app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    // look up how to configure this based on dev/production.
    origin,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
  // In production, the cookie is changed each time. That is why I am
  // not seeing items in my cart.. the sessionID also isn't being saved in cookie storage..
);

// Setup the session store here. conString is used to connect to our cloud database
const postgreStore = new pgSession({
  conString: process.env.PG_URL,
  createTableIfMissing: true, // this will create a `session` table if you do not have it yet
});

// Running into problems in production where the cart is not being displayed because
// each request makes a new session ID, hence a new session object.
// Had to configure some stuff here
// app.set("trust proxy", 1);

app.use(
  session({
    store: postgreStore,
    secret: process.env.SECRET_WORD,
    resave: false,
    saveUninitalized: false,
    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/orders", ordersRouter);

app.use(errorHandler);

// No real difference.. I can do the listen here or I can export the app and then
// use node's http to createServer and pass in our app

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));

module.exports = app;
