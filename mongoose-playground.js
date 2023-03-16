const mongoose = require("mongoose");

const Pizza = require("./models/Pizza.model");


mongoose
  .connect("mongodb://127.0.0.1/warriors-bites")
  .then((x) => {
    console.log(`Connected to Mongo! Database Name: "${x.connections[0].name}"`);

    const myNewPizza = { 
        name: "margarita",
        dough: "thin",
        price: 12
    };

    return Pizza.create(myNewPizza); //create a new document (a new pizza)
  })
  .then( (pizzaFromDB) => {
    
    const pizzasArr = [
        {
            name: "veggie",
            price: 15,
            isVeggie: true
        },
        {
            name: "seafood",
            price: 20,
            isVeggie: false
        }
    ];

    return Pizza.insertMany(pizzasArr); //create multiple documents at a time
  })
  .then( pizzasFromDB => {
    return Pizza.find({price: {$gt: 14} }); //find documents in a collection
  })
  .then( (pizzasArr) => {
    console.log(`currently, we have ${pizzasArr.length} pizzas that meet your search criteria`);

    return Pizza.findByIdAndUpdate("64132a789f2b20427d573685", {price: 54}, { returnDocument: 'after' }); //update (ex. with a specific id)
  })
  .then( (responseFromMongoose) => {
    return Pizza.findByIdAndRemove("64132a789f2b20427d573688"); //delete (ex. with a specific id)
  })
  .then( (deletedDocument) => {
    console.log("this pizza was deleted...");
    console.log(deletedDocument)
    
  })
  .catch((err) => console.error("Error connecting to DB", err));



/*****************/
/* async / await */
/*****************/
  
async function runDbQueries(){
    try {

        //connect
        const x = await mongoose.connect("mongodb://127.0.0.1/warriors-bites")
        console.log(`Connected to Mongo! Database Name: "${x.connections[0].name}"`);
    
        //create
        const myNewPizza = { name: "margarita" };
        const pizzaFromDB = await Pizza.create(myNewPizza);
    
        //create many
        const pizzasArr = [
            {name: "veggie"},
            {name: "seafood"}
        ];
        const pizzasFromDB = await Pizza.insertMany(pizzasArr);
        console.log(pizzasFromDB);
        
    } catch (err) {
        console.error("Error connecting to DB", err)
    }
}


// runDbQueries();
