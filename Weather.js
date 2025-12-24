const city_weather = document.getElementById('city_weather');
const city = document.getElementById('city');
const Tempature = document.getElementById('Tempature');
const humidity = document.getElementById('humidity');
const button = document.getElementById('Weather');
const cityname = document.getElementById('cityname');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

const API_key = "b565af6352c29f6a81e9ca21006f66d1";

button.addEventListener('click', async () => {

    if (!city_weather.value) {
        cityname.textContent = `Please Enter City Name`;
        return;
    }

    try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city_weather.value}&appid=${API_key}`
        );

        if (!response.ok) {
            throw new Error('City Not Found');
        }

        const data = await response.json();

        city.textContent = `City : ${data.name}`;
        Tempature.textContent = `Tempature : ${(data.main.temp - 273.15).toFixed(2)} °C`;
        humidity.textContent = `Humidity : ${data.main.humidity}%`;
        
        const sun_rise_time = data.sys.sunrise * 1000; 
        const time_sun_rise = new Date(sun_rise_time);

        const sun_set_time = data.sys.sunset * 1000; 
        const time_set_time = new Date(sun_set_time);

        sunrise.textContent = `Sunrise : ${time_sun_rise.getHours()}:${time_sun_rise.getMinutes().toString().padStart(2,'0')} AM`;
        sunset.textContent = `Sunset : ${time_set_time.getHours()}:${time_set_time.getMinutes().toString().padStart(2,'0')} PM`;

        
    } catch (error) {
        cityname.textContent = `City Not Found`;
     }

});
