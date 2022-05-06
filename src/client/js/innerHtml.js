 
 // final search results posting to index.html by using javascript innerHTML method
function innerHtml (data) {
    
    const daysof = (Math.round(data[3].days / (1000 * 60 * 60 * 24)) + 1);
    const city = JSON.stringify(data[2].city);
    console.log('city before', data[2].city)
    // used substring to select the first charactor to Capital
    const cityReg = `${city[1].toUpperCase(city)}${city.substring(2, (city.length -1)).toLowerCase(city)}`;
    console.log('this is', cityReg)
    let message = document.querySelector("#message")
    message.innerHTML = `${cityReg}, ${data[0].geoApiData.countryName} in ${daysof} day / days.`;

    let forecast = document.querySelector("#forecast")
    forecast.innerHTML = `The weather is:`;

    let temp = document.querySelector("#temp")
    temp.innerHTML = `High: ${data[1].weatherData.max_temp}°C / Low: ${data[1].weatherData.low_temp}°C`;

    let description = document.querySelector("#description")
    description.innerHTML = `For the most part of the day there will be ${data[1].weatherData.description}.`;
    
    imagedisplay()
    function imagedisplay ()  {
    document.querySelector("#imagePb").src = `${data[4].photoData.webformatURL}`
    }
}


export {innerHtml}