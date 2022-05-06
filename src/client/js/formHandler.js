async function handleSubmit(event) {
    event.preventDefault()

    //calculates the number of days remaining to the trip
    let startDate = document.getElementById("startDate").valueAsNumber;
    

    //user input value
    let destination = document.getElementById('destination').value;

    let today = new Date();

    //calculating total time
    let totalDays = startDate - today.getTime();

    //length of days
    let endDate = document.getElementById("endDate").valueAsNumber;
    
    if(endDate && (startDate >= endDate)){
        alert('Return date can not be before the departure date. Please correct to proceed!');
        return false
    }  else if (!destination) {
        alert('Please enter your destination!');
    } else if(!startDate || !endDate) {
        alert('Please select the dates')
    }
    
    else{
        /*for api call for geonames*/
          
        const geo = await fetch("http://localhost:8081/geo",{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ city: destination }),
        }); 
        const geoApiData = await geo.json();
        console.log('console log 3rd May',geo);
        
        /*for api call for weatherbit*/
        const weatherRes = await fetch("http://localhost:8081/weather", {
            method: "POST",
            mode: "cors",
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({ lat: geoApiData.lat, lng: geoApiData.lng, days: totalDays }),
        });
        const weatherData = await weatherRes.json();
        

        /*for api call for pixabay*/
        const photoRes = await fetch("http://localhost:8081/images", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({ city: destination, countryName: geoApiData.countryName }),
        });
        console.log("THIS IS COUNTRYNAME" , geoApiData.countryName)
        const photoData = await photoRes.json();
    
        const data = [{ geoApiData }, { weatherData }, { city: destination }, { days: totalDays }, { photoData }]

        Client.innerHtml(data);

        console.log('THIS IS FINAL DATA', data)
        
    };

};


   
export {handleSubmit};
    
