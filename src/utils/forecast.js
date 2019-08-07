const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/830e46914bf24cb9ce62ec3745ad8ba9/${latitude},${longitude}?units=si&lang=en`;

  request({
      url,
      json: true
    },
    (error, {
      body
    }) => {
      if (error) {
        callback("Unable to connect to Weather service", undefined);
      } else if (body.error) {
        callback("Unable to find location", undefined);
      } else {
        callback(
          undefined,
          `Forecast: ${body.daily.data[0].summary} It is currently ${
            body.currently.temperature
          } C out. Todays high temperature ${
            body.daily.data[0].temperatureHigh
          } C, low ${body.daily.data[0].temperatureLow} C. There is a ${
            body.currently.precipProbability
          }% chance of rain.`
        );
      }
    }
  );
};

module.exports = forecast;