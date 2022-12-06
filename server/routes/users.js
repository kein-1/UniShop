const express = require("express");
const bcrypt = require("bcrypt");
const client = require("../elephant");

const usersRouter = express.Router();

usersRouter.post("/", async (request, response) => {
  const { username, password, email } = request.body;
  if (!username || !password || !email) return response.status(404).json({ errorMessage: "Missing username, password, or email!" });

  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);
  console.log(username + password + passwordHash + email);

  // const query = {
  //   text: "INSERT into users(username,password_hash,email) VALUES ($1,$2,$3)",
  //   values: [username, passwordHash, email],
  // };

  await client.query("INSERT into users(username,password_hash,email) VALUES ($1,$2,$3)", [
    username,
    passwordHash,
    email,
  ]);
  return response.status(200).json({ username, passwordHash, email });
});

module.exports = usersRouter;
