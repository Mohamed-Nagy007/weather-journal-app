// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Require CORS 
const cors = require("cors");

app.use(cors());

//Require body-parser
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// endpoint object
projectData = {};



// point to the project folder
app.use(express.static("website"));

//GET route

//Post route & create a new entry in the apps endpoint
const postData = (req, res) => {
  let data = req.body;
   projectData["temp"]= data.temp;
   projectData["city"]= data.city;
   projectData["description"]= data.description;
   projectData["icon"]= data.icon;
}

app.post("/postData", postData)


// GET Route Return Endpoint Data
const getData = (req, res) => {
  res.send(projectData);
}

app.get("/all", getData)


// Local Server Setup
const port = 8000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})