const express = require("express");
const http = require("http");
const request = require("request");
const db = require("./db.js");

const app = express();

const { APIkey } = require("./secrets.json");
const basicURL = "https://api.themoviedb.org/3/movie/";
let randomMovieId = parseInt(Math.random() * (25000 - 1 + 1), 10) + 1;
const deLanguage = "&language=de-DE";
const enLanguage = "&language=en-EN";

app.use(express.static("./public"));
app.use(express.static(__dirname));

app.use(express.json());

app.use((req, res, next) => {
  randomMovieId = parseInt(Math.random() * (25000 - 1 + 1), 10) + 1;
  next();
});

app.get("/getMovie", (req, res) => {
  request(basicURL + randomMovieId + "?api_key=" + APIkey + enLanguage, (err, response, body) => {
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

// HIGHSCORE DATABASE

app.post("/uploadHighscore", (req, res) => {
  const { username, score } = req.body;
  db.uploadHighscore(username, score).then(() => {
    db.getHighscore().then((result) => {
      res.json(result);
    });
  });
});

app.listen(process.env.PORT || 8080);
