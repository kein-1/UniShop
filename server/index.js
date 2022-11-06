// Process the .env variables
require("dotenv").config();

// Use node's http to create our server
const http = require("http");

// Import the actual express app
const app = require("./app");

const server = http.createServer(app);

const { PORT } = process.env;
server.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
// rules: {
//     quotes: "off",
//     eqeqeq: "error",
//     "no-console": 0,
//   },

// rules: {
//     quotes: "off",
//     eqeqeq: "error",
//     "no-console": 0,
//     "prettier/prettier": ["error"],
//   },
