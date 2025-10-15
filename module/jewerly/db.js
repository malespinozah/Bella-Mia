require('dotenv').config();

const mongoose = require("mongoose");

//const dbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?authSource=testdb`;
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}?retryWrites=true&w=majority`;

//set up Schema and model
const JewerlySchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  material: String
});
const Jewerly = mongoose.model("Jewerly", JewerlySchema);

// Track connection status
let isConnected = false;

//MONGODB FUNCTIONS
async function connect() {
    if (isConnected) return;
    try {
        await mongoose.connect(dbUrl);
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (err){
        console.error ("Error connecting to MongoDB:", err);
        throw err;
    }
}

//Get all jewerlies from the jewerlies collection
async function getJewerlies() {
  await connect();
  return await Jewerly.find({}); //return array for find all
}

// Initialize jewerlies collection with some data.
async function initializeJewerlies(){
    await connect();
  const jewerlyList = [
    {
        name: "Obsession",
        type: "Necklace",
        price: 200.00,
        material: "18K Gold"
    },
    {
        name: "LeFrench",
        type: "Necklace",
        price: 430.00,
        material: "Pearls"
    },
    {
        name: "Uniquete",
        type: "Necklace",
        price: 390.00,
        material: "Pearls"
    },
    {
        name: "LaVieRossé",
        type: "Necklace",
        price: 400.00,
        material: "18K Gold"
    },
    {
        name: "Dome",
        type: "Earrings",
        price: 180.00,
        material: "18K Gold"
    },
    {
        name: "Teardrop",
        type: "Earrings",
        price: 150.00,
        material: "18K Gold"
    },
    {
        name: "Lovely",
        type: "Earrings",
        price: 210.00,
        material: "Pearls"
    },
    {
        name: "Hipnotic",
        type: "Earrings",
        price: 320.00,
        material: "18K Gold"
    },
    {
        name: "Authentic Chick",
        type: "Ring",
        price: 500.00,
        material: "18K Gold"
    },
    {
        name: "Double Passion",
        type: "Ring",
        price: 550.00,
        material: "Pearls"
    },
    {
        name: "Damian",
        type: "Ring",
        price: 800.00,
        material: "18K Gold"
    },
    {
        name: "Luck Of Diva",
        type: "Ring",
        price: 740.00,
        material: "18K Gold"
    },
    {
        name: "Red Carpet",
        type: "Anklet",
        price: 300.00,
        material: "18K Gold"
    },
    {
        name: "Sun & U",
        type: "Anklet",
        price: 260.00,
        material: "Pearls"
    },
    {
        name: "Stronger",
        type: "Anklet",
        price: 280.00,
        material: "18K Gold"
    },
    {
        name: "Ladynight",
        type: "Anklet",
        price: 310.00,
        material: "18K Gold"
    }
  ];
  await Jewerly.insertMany(jewerlyList);
  console.log("Jewerlies initialized");
}

// Function to add a jewerly to jewerlies collecion
async function addJewerly(jewerlyName, jewerlyType, jewerlyPrice, jewerlyMaterial){
    await connect();
    let newJewerly = new Jewerly({
      name: jewerlyName,
      type: jewerlyType,
      price: jewerlyPrice,
      material: jewerlyMaterial
    });
    await newJewerly.save(); // This is the line which actually saves newJewerly to the DB
    console.log(`Added jewerly: ${jewerlyName}`);
  }

module.exports = {
  getJewerlies,
  initializeJewerlies,
  addJewerly
}
