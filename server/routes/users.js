const express = require("express");
const bcrypt = require("bcrypt");
const client = require("../elephant");
const jwt = require("jsonwebtoken");
const usersRouter = express.Router();

usersRouter.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const { row } = await client.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  console.log(row);
  if (row.length === 0) return response.send("Incorrect username or password!");
});

usersRouter.post("/", async (request, response) => {
  const { username, password, email } = request.body;
  if (!username || !password || !email)
    return response
      .status(404)
      .json({ errorMessage: "Missing username, password, or email!" });

  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);
  console.log(username + password + passwordHash + email);

  // It is better to use paramatized variables such as below rather than string
  // concatenation to prevent sql injection attacks
  const query = {
    text: "INSERT into users(username,password_hash,email) VALUES($1,$2,$3)",
    values: [username, passwordHash, email],
  };

  await client.query(query);
  return response.status(200).send("Successfully registered!");
});

module.exports = usersRouter;
