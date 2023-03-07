const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const PORT = process.env.PORT_NODE || 3000;

const Users = require("../models/user");

app.get("/", async (req, res) => {
  try {
    console.log(
      Users(Sequelize).create({ username: "teste", password: "teste" })
    );
    res.send("teste");
  } catch (err) {
    console.log(err);
    res.send("Error");
  }
});

app.post("/token").post((req, res) => {});

app.all("/api/*", (req, res, next) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
