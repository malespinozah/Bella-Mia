const express = require("express");
const path = require("path"); //needed when setting up static/file paths
const dotenv = require("dotenv");

//load the environment variables from .env
dotenv.config();

const db = require("./module/jewerly/db"); //load db.js*/

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

// Middleware to set correct Content-Type for JavaScript files
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('X-Content-Type-Options', 'nosniff');
  }
  next();
});

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

// SET UP PAGE ROUTE
app.get("/", (request, response) => {
    //response.status(200).send("Test");
    response.render("index", {title : "Home"});
});

app.get("/faq", (request, response) => {
    //response.status(200).send("Test");
    response.render("faq", {title : "FAQs"});
});

app.get("/shop", async (request, response) => {
    let jewerlyList = await db.getJewerlies();
    //if there's nothing in the jewerly collection, initialize with some content then get the jewerlies again
    if (!jewerlyList.length) {
        await db.initializeJewerlies(); 
        jewerlyList = await db.getJewerlies();
      }
      response.render("shop", { jewerlies: jewerlyList });
});

/* ---ADDING NEW JEWERLY--- */
app.get("/add", async(request, response) => {
    // add a new jewerly
    await db.addJewerly("Extravaganza", "Necklace", 240, "Pearls");
    response.redirect("/shop");
  }); 

//set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });