
# Travel App

Travel app developed for Udacity's Front End Developer Nano Degree courses capstone project.

## Technologies utilized in this project include:

* HTML MarkUp
* Node JS back-end,
* Express JS Framework,
* CSS Grid and Flexbox for responsive styling,
* Vanilla JS for Front-End and Server side,
* Webpack as a build tool and asset bundler,
* NPM as a package manager,


## API's included in this project:
* GeoNames - for city co-ordinates
* Weatherbit - for weather forecasts
* Pixabay - for city images

## Functionality of Travel App

1. The user selects city name with departure and return date of the trip and submit the form, after the form validation and completing all the tests, if no errer happens then it will request geolocation api to pull longitude and latitude which will be used in the weather bit  api to locate the city.   Pixabay api is also using the user input city name  with the country name pulled off from geolocation api and send the data to the endpoint which accessed by formhandler javascript file. 

## To run the application, follow steps as follows

Download the file from this GitHub repo

Install Node Package Manager (npm)
1 npm install

2 npm run build-prod

3 npm start 

To start developer server.

npm run build-dev.

___________________

To perform testing

npm test

___________________



