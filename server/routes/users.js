require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../elephant");

const usersRouter = express.Router();

usersRouter.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const { rows } = await client.query("SELECT * FROM users WHERE username = $1", [username]);
  if (rows.length === 0) return response.status(400).send("Incorrect username or password!");

  // Can index into 1st column since usernames are unique so
  // it will always return 1 entry
  const passwordCorrect = await bcrypt.compare(password, rows[0].password_hash);

  if (!passwordCorrect) return response.status(400).send("Incorrect username or password!");

  const userTokenInfo = {
    username,
    id: rows[0].user_id,
  };
  console.log(rows);

  const token = jwt.sign(userTokenInfo, process.env.JWT_KEY);
  return response.send({ token, username, name: rows[0].firstname });
});

usersRouter.post("/", async (request, response) => {
  const { username, password, email } = request.body;
  if (!username || !password || !email) return response.status(404).json({ errorMessage: "Missing username, password, or email!" });

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
