const express = require("express");
const hbs = require("hbs");
const { default: mongoose } = require("mongoose");
const Pizza = require("./models/Pizza.model");
const bodyParser = require("body-parser");

const app = express();

// publish folder public and make its content available
app.use(express.static("public"));
// set bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// set directory for views
app.set("views", __dirname + "/views");
//sets hbs (handlebars) as the template engine
app.set("view engine", "hbs");

// set directory for partials
hbs.registerPartials(__dirname + "/views/partials");

// connect to db
mongoose
  .connect("mongodb://127.0.0.1/warriors-bites")
  .then((x) =>
    console.log(`Connection set up to server: ${x.connections[0].name}`)
  )
  .catch((err) => console.error("Error connecting to DB", err));

// route for homepage
app.get("/", (req, res, next) => {
  res.render("home");
});

// route for contact page
app.get("/contact", (req, res, next) => {
  res.render("contact-page");
});

// route for pizzas page

app.get("/pizzas", (req, res, next) => {
  console.log(req.query);
  // set filter if maxPrice exsists
  const filter = req.query.maxPrice
    ? { price: { $lte: Number(req.query.maxPrice) } }
    : {};

  Pizza.find(filter)
    .then((dbResponse) => {
      //   console.log(dbResponse);
      res.render("product-list", { pizzas: dbResponse });
    })
    .catch((err) => console.error(err));
});

// generic route
// GET pizzas/:pizzaName
app.get("/pizzas/:pizzaName", (req, res, next) => {
  Pizza.findOne({ name: req.params.pizzaName })
    .then((dbResponse) => {
      //   console.log(dbResponse);
      res.render("product", dbResponse);
    })
    .catch((err) => console.error("Problems receiving data from DB"));
});

// POST login information
app.post("/login", (req, res, next) => {
  console.log(req.body.password);
  res.send("processing your login.....");
});

app.listen(3001, () => {
  console.log("server listening on port 3001");
});
