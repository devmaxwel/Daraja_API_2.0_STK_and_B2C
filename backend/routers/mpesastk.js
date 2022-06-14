const request = require("request");
const express = require("express");
const moment = require("moment");
const access_token = require("../utils/AccessToken");
const passwordBBase64 = require("../utils/base64");
const Router = express.Router();

Router.post("/", access_token, (req, res) => {
  let url = process.env.endpoint_stk_push;
  let auth = "Bearer " + req.access_token;
  const timeStamp = moment().format("YYYYMMDDHHmmss");
  const passKey = process.env.Pass_key;
  const shortCode = process.env.ShortCode;
  const password = passwordBBase64(shortCode, passKey, timeStamp);

  request(
    {
      url: url,
      method: "POST",
      headers: {
        Authorization: auth,
      },
      json: {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: req.body.amount,
        PartyA: req.body.number,
        PartyB: shortCode,
        PhoneNumber: req.body.number,
        CallBackURL: `${process.env.callBackDomain}/api/v4/stkcallback`,
        AccountReference: "RARI_PAY",
        TransactionDesc: "Crypto Transactions",
      },
    },
    (err, resp, body) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json(body);
    }
  );
});

module.exports = Router;
