//! today data
let dayTData = document.getElementById('dayT');
let dateNumTData = document.getElementById('dateNumT');
let dateMoTData = document.getElementById('dateMoT');
let locationTData = document.getElementById('locationT');
let degreeTData = document.getElementById('degreeT');
let tempTData = document.getElementById('tempT');
let imgTData = document.getElementById('imgT');
let customTData = document.getElementById('customT');
let umberellaTData = document.getElementById('umberellaT');
let windTData = document.getElementById('windT');
let compassTData = document.getElementById('compassT');
let locationTcountryData = document.getElementById('locationTcountry');

//! NEXT day 
let dayNextData = document.getElementsByClassName('dayNext');
let imgNextData = document.getElementsByClassName('imgNext');
let degreeNextData = document.getElementsByClassName('degreeNext');
let tempNextData = document.getElementsByClassName('tempNext');
let customNextData = document.getElementsByClassName('customNext');

//! search
let searchdata = document.getElementById('search');


//! fetch data

async function getWeather(cityName) {
    let api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e368da1931a4466c8b7215448241607&q=${cityName}&days=3`);
    let weatherData = await api.json();
    console.log(weatherData);
    return weatherData;
}

//! fn todayData
function todayData(data) {
    let imageUrl = data.current.condition.icon;
    imgTData.src = imageUrl;
    let todayData = new Date()
    dayTData.innerHTML = todayData.toLocaleDateString("en-US", { weekday: "long" });
    dateMoTData.innerHTML = todayData.toLocaleDateString("en-US", { month: "short" });
    dateNumTData.innerHTML = todayData.getDate();
    locationTData.innerHTML = data.location.name;
    tempTData.innerHTML = data.current.temp_c + "<sup>o</sup>c";
    locationTcountryData.innerHTML = data.location.country;
    customTData.innerHTML = data.current.condition.text;
    umberellaTData.innerHTML = data.current.humidity + "%";
    windTData.innerHTML = data.current.wind_kph + "km/h";
    compassTData.innerHTML = data.current.wind_dir;
}




//! fn tom-after 

function tomAfter(data) {
    let forecastdayData = data.forecast.forecastday
    console.log(forecastdayData);
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastdayData[i + 1].date);
        dayNextData[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" });
        tempNextData[i].innerHTML = forecastdayData[i + 1].day.mintemp_c;
        degreeNextData[i].innerHTML = forecastdayData[i + 1].day.maxtemp_c;
        imgNextData[i].src = forecastdayData[i + 1].day.condition.icon;
        customNextData[i].innerHTML = forecastdayData[i + 1].day.condition.text;
    }
}

//! startwebSite
async function startwebSite(city = "cairo") {
    let weatherData = await getWeather(city);
    if (!weatherData.error) {
        todayData(weatherData);
        tomAfter(weatherData);
    }

}
startwebSite()

searchdata.addEventListener("input", function () {
    console.log(searchdata.value);
    startwebSite(searchdata.value);
})