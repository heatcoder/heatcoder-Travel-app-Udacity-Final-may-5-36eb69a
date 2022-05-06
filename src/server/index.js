const bodyParser = require('body-parser');
var axios = require('axios');
const dotenv = require('dotenv'); dotenv.config();
var path = require('path');
// var request = require("request");

//Express server to  run the server and to set up route handlers
const express = require('express');

// Set up an instance of app
const app = express();

app.use(express.static('dist'))
app.use(express.static('src'));
console.log(__dirname)

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance - allows requesting from a domain outside its own origin domain
const cors = require('cors');
app.use(cors());


//endpoint
app.get('/', function(req, res, next) {
    res.sendFile('dist/index.html')
});

//Server Port number
app.listen(8081, function() {
    console.log('running on port 8081!')
});

module.exports = app;


//Enviornment file keys
let weatherbit = process.env.WEATHERBIT;
let pixKey = process.env.PIXABAY;
let geoKey = process.env.GEOKEY;

//Geonames.org API
app.post('/geo', async function (req, res, next) {
    try {
        const geoData = await axios.post(`http://api.geonames.org/searchJSON?q=${req.body.city}&maxRows=1&username=${geoKey}`);       
        const {data} = geoData;
        let latLng = {lng: data.geonames[0].lng,  lat: data.geonames[0].lat,  countryName: data.geonames[0].countryName, errorCode: data.geonames};
        res.send(latLng);
    } catch (error) {
    
        if (!res.data) {
            next(new Error("user input for city is wrong !"));
            return;
        }
        next(res);
        res.send(data)
        
    } 
});



//Weatherbit API
app.post('/weather', async function (req, res)  {
    try {
        const apiWeatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.body.lat}&lon=${req.body.lng}&key=${weatherbit}`);
        const {data} = await apiWeatherData;
        // console.log("data", data)
        let calcDays = (1000 * 60 * 60 * 24) +1;
        const presentForecast = Math.round(req.body.days/calcDays);
        const weather = {max_temp: data.data[presentForecast].max_temp,   description: data.data[presentForecast].weather.description,   low_temp: data.data[presentForecast].low_temp,}; 
        res.send(weather);
        // console.log(data);

    } catch (error) {
        console.log("There was an error", error);
    }
});

//Pixabay API - populate images as per the input city name if no images under city name, api will fetch images under country name
app.post('/images', async function (req, res) {
    try {
        const downloadImage = await axios.get(`https://pixabay.com/api/?key=${pixKey}&q=${req.body.destination}&image_type=photo`)
        const {errorCode} = downloadImage.status;
        // console.log('STATUS of DOWNLOAD IMAGE', downloadImage.status)
        if (errorCode === "200") {
            const {data} = await downloadImage;
            const image = {webformatURL: data.hits[0].webformatURL}; 
            res.send(image);   
        } else {
            const downloadImage = await axios.get(`https://pixabay.com/api/?key=${pixKey}&q=${req.body.countryName}&image_type=photo`)
            const {data} = await downloadImage;
            const image = {webformatURL: data.hits[1].webformatURL}; 
            res.send(image);
            console.log(data);
        }
        
    } catch (error) {
        console.log("Pixabay Error", error);
    }
});



