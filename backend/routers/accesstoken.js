const express = require("express");
const access_token = require("../utils/AccessToken");
const Router = express.Router();

Router.get("/", access_token, (req, res) => {
  res.status(200).json({ access_token: req.access_token });
});

module.exports = Router;
