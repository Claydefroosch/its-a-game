const express = require("express");
const http = require("http");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
var jsonParser = bodyParser.json();
const { APIkey } = require("./secrets.json");

const basicURL = "https://api.themoviedb.org/3/movie/";

let randomMovieId = parseInt(Math.random() * (25000 - 1 + 1), 10) + 1;

const language = "&language=de-DE";

app.use(express.static("./public"));
app.use(express.static(__dirname));

app.use((req, res, next) => {
  randomMovieId = parseInt(Math.random() * (25000 - 1 + 1), 10) + 1;
  console.log("Random Movie Id", randomMovieId);
  next();
});

app.get("/getMovie", (req, res) => {
  request(basicURL + randomMovieId + "?api_key=" + APIkey + language, (err, response, body) => {
    const bodyObject = JSON.parse(body);
    res.json(bodyObject);
  });
});

app.get("/getConfig", (req, res) => {
  request("https://api.themoviedb.org/3/configuration" + "?api_key=" + APIkey, (err, response, body) => {
    const bodyObject = JSON.parse(body);
    res.json(bodyObject);
  });
});

app.listen(process.env.PORT || 8080);
