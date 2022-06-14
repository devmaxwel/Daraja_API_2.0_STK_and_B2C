const express = require("express");
const prettyjson = require("prettyjson");
const fs = require("fs");
const Router = express.Router();

Router.post("/", (req, res) => {
  console.log("_________MPESA_STK_CALLBACK_______");
  console.log(prettyjson.render(req.body));

  setTimeout(() => {
    if (req.body.Body.stkCallback.CheckoutRequestID) {
      let data = fs.readFileSync("../../client/src/data/callbackurl.json");
      let jsonData = JSON.parse(data);
      let incomingCallBackURLData = {
        callBackUrlData: req.body.Body.stkCallback,
      };
      jsonData.push(incomingCallBackURLData);
      let newData = JSON.stringify(jsonData);
      fs.writeFileSync(
        "../../client/src/data/callbackurl.json",
        newData,
        (err) => {
          res.status(400).json(err);
        }
      );
      return;
    }
  }, 30000);
});

module.exports = Router;
