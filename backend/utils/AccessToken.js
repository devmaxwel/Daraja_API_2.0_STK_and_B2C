const authBase64 = require("./AuthBase64");
const request = require("request");

const access_token = (req, res, next) => {
  let endpoint_url = process.env.endpoint_get_auth_credentials;
  let auth = authBase64(process.env.consumer_Key, process.env.consumer_Secret);

  request(
    {
      url: endpoint_url,
      headers: {
        Authorization: "Basic " + auth,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        req.access_token = JSON.parse(body).access_token;
        next();
      }
    }
  );
};

module.exports = access_token;
