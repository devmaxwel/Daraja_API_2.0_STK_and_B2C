const express = require("express");
const request = require("request");
const access_token = require("../utils/AccessToken");
const Router = express.Router();

Router.post("/", access_token, (req, res) => {
  let endpoint_url = process.env.endpoint_b2c_request;
  let auth = "Bearer " + req.access_token;

  request(
    {
      uri: endpoint_url,
      method: "POST",
      headers: {
        Authorization: auth,
      },
      json: {
        InitiatorName: process.env.initiatorName,
        SecurityCredential: process.env.securityCredential,
        CommandID: "BusinessPayment",
        Amount: req.body.amountToBePayed,
        PartyA: process.env.PartyA,
        PartyB: req.body.number,
        Remarks: process.env.Remarks,
        QueueTimeOutURL: `${process.env.callBackDomain}/timeout_url`,
        ResultURL: `${process.env.callBackDomain}/result_url`,
        Occassion: process.env.Occassion,
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
