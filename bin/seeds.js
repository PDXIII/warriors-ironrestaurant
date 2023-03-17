const mongoose = require("mongoose");
const Pizza = require("../models/Pizza.model");

mongoose
  .connect("mongodb://127.0.0.1/warriors-bites")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    //WARNING: this will delete all pizzas in your DB !!
    return Pizza.deleteMany({});
  })
  .then((response) => {
    console.log(response);

    const newPizzasArr = [
      {
        name: "margarita",
        price: 12,
        imageFile: "pizza-margarita.jpg",
        ingredients: ["mozzarella", "tomato sauce", "basilicum"],
        isVeggie: true,
      },
      {
        name: "veggie",
        price: 15,
        imageFile: "pizza-veggie.jpg",
        ingredients: ["tomato", "cucumber", "olives"],
        isVeggie: true,
      },
      {
        name: "seafood",
        price: 20,
        imageFile: "pizza-seafood.jpg",
        ingredients: ["mozzarella", "tomato", "prawn"],
      },
      {
        name: "Hawaiian",
        price: 17,
        imageFile: "pizza-hawaiian.jpg",
        ingredients: ["mozzarella", "pineapple", "patience..."],
      },
    ];

    return Pizza.insertMany(newPizzasArr);
  })
  .then((pizzaArrFromDB) => {
    //chef, our pizzas were created :)
    console.log("Number of pizzas created: ", pizzaArrFromDB.length);
  })
  .catch((err) => console.error("Error... ", err))
  .finally(() => {
    // Once created, close the DB connection
    mongoose.connection.close();
    console.log("Connection closed!");
  });
