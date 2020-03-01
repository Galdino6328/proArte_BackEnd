const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const engines = require("consolidate");
const path = require("path");

//Routes
//const paymentsRoute = require("./src/routes/paymentsRoute");
const paymentsController = require("./src/controllers/paymentsController");

//Load environment
require("./src/config/getEnv")();

const app = express();

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(
  "/payments/checkout/:id/:email/:description/:amount",
  paymentsController.checkout
);
app.get("/success", (req, res) => {
  return res.render("success_screen");
});

app.get("/pending", (req, res) => {
  return res.render("pending_screen");
});

app.get("/failure", (req, res) => {
  return res.render("failure_screen");
});

//views
app.engine("ejs", engines.ejs);
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");

//Payments route
//app.use("/payments", paymentsRoute);

app.listen(process.env.API_PORT || 3001, function(err) {
  if (err) console.error(err);
  console.log(`API INICIADA NA PORTA ${process.env.API_PORT} 🚀`);
});
