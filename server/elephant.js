// Postgres and install new client. Pass in the connection string
const pg = require("pg");

const client = new pg.Client({ connectionString: process.env.PG_URL });

// Connect to our database

const connectHandler = async () => {
  try {
    await client.connect();
    console.log("We are connected!");
  } catch (error) {
    console.log("Error connecting!");
    console.log(error);
  }
};
console.log("Logged in elephant");
connectHandler();

// We don't need to export connectHandler since we are running it in here.
// As soon as we export a file, the code inside it is automatically parsed and used
// This means connectHandler is automatically loaded in our app.js
// even if we don't call it in there because this module is exported
// Now we export the client so we can use this client variable to make queries in
// our other routes across our app
module.exports = client;
