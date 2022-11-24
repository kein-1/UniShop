require("dotenv").config();

const http = require("http"); // Use node's http

const app = require("./app"); // Import our express app

const server = http.createServer(app); // Make a server

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}`));
