const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "98d7ac63a62683bd583d8d6532148b7b";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey + "";

  https.get(url, function(response) {
    console.log(response.statusCode);
    if (response.statusCode == 200) {
      console.log("200 means: Successful Execution");
    }
    //function ON the data that we got
    //"res" -- from our server to client
    //"response" -- from external server to our server
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const temp = weatherData.main.temp;
      console.log(temp);

      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);

      const weatherIcon = weatherData.weather[0].icon;
      console.log(weatherIcon);
      const iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

      res.write("<h1>The temperature in "+ query +" is " + temp + " degree Celcius</h1>");
      res.write("<h3>Weather is currently " + weatherDescription + " probably</h3>");
      res.write("<img src =" + iconURL + ">");
      //This is going to send the Temp information, Weather Description and the corresponding image
      res.send();
    });
  });
});


//Instead of sending this send message we want to send
//the GET request to the OpenWeather Server
app.listen(3000, function() {
  console.log("Server initialized at port 3000");
});
