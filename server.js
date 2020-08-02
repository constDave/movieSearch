const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/results", (req, res) => {
  const searchQuery = req.query.search;

  axios(
    `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchQuery}`
  )
    .then(data =>
      res.render("results", {
        data: data.data.Search
      })
    )
    .catch(error => console.error(error));
});

app.listen(port, () => {
  console.log(`App listening on ${port}.`);
});
