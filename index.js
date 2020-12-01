const express = require("express");
const http = require("http");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
var jsonParser = bodyParser.json();
const { APIkey } = require("./secrets.json");
const basicURL = "https://api.themoviedb.org/3/movie/";
const randomMovieId = parseInt(Math.random() * (25000 - 1 + 1), 10) + 1;
const language = "&language=de-DE";

app.use(express.static("./public"));
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get("/getMovie", (req, res) => {
  request(basicURL + randomMovieId + "?api_key=" + APIkey + language, (err, response, body) => {
    res.json(body);
  });
});

app.listen(process.env.PORT || 8080);
