const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const stkpush = require("./routers/mpesastk.js");
const b2customer = require("./routers/b2cmpesa");
const timeout_url = require("./routers/timeout_url");
const b2c_resulturl = require("./routers/b2c_resulturl");
const access_token = require("./routers/access_token");
const callbackurl = require("./routers/callback_url");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// -------------- API's START --------------------

app.use("/api/v1/access_token", access_token);
app.use("/api/v2/stkpush", stkpush);
app.use("/api/v3/b2customer_request", b2customer);
app.use("/api/v4/callbackurl", callbackurl);
app.use("/api/v5/timeouturl", timeout_url);
app.use("/api/v6/resulturl", b2c_resulturl);

// ---------------API's END-----------------

// ----------------Deployment to Heroku-------------

__dirname = path.resolve(); // initializing the curent directory
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200);
  });
}

// ----------------Deployment end-----------------
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
