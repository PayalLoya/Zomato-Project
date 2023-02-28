const express = require("express");
const mongo = require("mongodb");
const dotenv = require("dotenv");
const cors  = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
const MongoClient = mongo.MongoClient;
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;
let db;

//supporting libraries - middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Mongodb Connection
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
MongoClient.connect(MONGO_URL, connectionParams)
    .then( () => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. ${err}`);
    });

// Express server default endpoint
app.get("/", (req,res) => {
    res.send("Hello, welcome to Express 🥳😄😃😄")
});

// location endpoint
app.get("/locations", (req, res) => {
   db.collection("locations").find().toArray((err, result) => {
        if (err) throw error
        res.send(result);
    });
});

  
  