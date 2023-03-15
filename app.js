const express = require("express");
const hbs = require("hbs");

const app = express();

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine


// Make everything inside of public/ available
app.use(express.static('public'));


hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials


//Route for homepage
app.get("/", (request, response, next) => {
    response.render("home");
});


//Route for contact page
app.get("/contact", (request, response, next) => {
    response.render("contact-page");
})


//GET /pizzas/margarita
app.get("/pizzas/margarita", (request, response, next) => {

    const data = {
        title: 'Pizza Margarita',
        price: 12,
        imageFile: 'pizza-margarita.jpg',
        ingredients: ['mozzarella', 'tomato sauce', 'basilicum'],
    };

    response.render("product", data);
});


//GET /pizzas/veggie
app.get("/pizzas/veggie", (request, response, next) => {

    const data = {
        title: 'Veggie Pizza',
        price: 15,
        imageFile: 'pizza-veggie.jpg',
        ingredients: ['cherry tomatoes', 'basilicum', 'Olives'],
    };
    
    response.render("product", data);
});


//GET /pizzas/seafood
app.get("/pizzas/seafood", (request, response, next) => {

    const data = {
        title: 'Seafood Pizza',
        imageFile: 'pizza-seafood.jpg',
    };

    response.render("product", data);
});



app.listen(3001, () => { console.log("server listening on port 3001")});