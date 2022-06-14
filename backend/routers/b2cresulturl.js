const express = require("express");
const prettyjson = require("prettyjson");
const Router = express.Router();

Router.post("/", (req, res) => {
  console.log("______________RESULT_URL_______");
  console.log(prettyjson.render(req.body));
});

module.exports = Router;
