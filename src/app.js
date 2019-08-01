const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Aco Vidovič"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Aco Vidovič"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    messageHelp: "To find about weather in certain location, type in the name of that location into the search box.",
    title: "Help",
    name: "Aco Vidovič"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide the address"
    });
  }

  geocode(req.query.address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    })
  })
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aco Vidovič",
    message404: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aco Vidovič",
    message404: "Page not found"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});