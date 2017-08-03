//"Open Weather Map API Key"
var apiKey = '94a01025ab9f633197d71f8f190b6c5b';

//cache the parts which will be filled with information provided by the API response
var cityName = $('.city-name');
var indicatedTemperature = $('.temperature');
var weatherInfo = $('.weather-info');
var weatherIcon = $('.weather-icon');

//function which capitalizes the first letter of a string
function capitalizer(param) {
    var firstCapitalLetter = param.charAt(0).toUpperCase();
    var followingLetters = param.slice(1);
    var totalLetters = firstCapitalLetter + followingLetters;
    return totalLetters;
}

//request the user's location and build upon the latitude and longitude that gets sent back to us
navigator.geolocation.getCurrentPosition(function(data) {
    var lat, lng;
    lat = data.coords.latitude;
    lng = data.coords.longitude;

    //get the information with the "Open Weather" API call
    fetch('http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lng + '&units=metric&APPID=' + apiKey)
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            response.json().then(function(data) {
                var locationName = data.list[1].name;
                var temperature = data.list[1].main.temp;
                var extraInfo = data.list[1].weather[0].description;
                capitalizer(extraInfo);
                var icon = data.list[1].weather[0].icon;
                cityName.text('City: ' + locationName);
                indicatedTemperature.html(temperature + '&#8451;');

                //capitalize the first letter in the weather description using the "capitalizer" function
                weatherInfo.html(capitalizer(extraInfo));
                console.log(extraInfo);
                weatherIcon.attr('src', 'http://openweathermap.org/img/w/' + icon + '.png');
                console.log(data.list[1].weather);

            });
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

});