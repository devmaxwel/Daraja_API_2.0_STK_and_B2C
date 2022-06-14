const express = require("express");
const prettyjson = require("prettyjson");
const Router = express.Router();

Router.post("/", (req, res) => {
  console.log("_________MPESA_STK_CALLBACK_______");
  console.log(prettyjson.render(req.body));
});

module.exports = Router;
