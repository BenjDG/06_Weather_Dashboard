$(document).ready(function () {
    //store city name
    var recentCityNames = [];

    $('#submit').on('click', function (event) {
        //console.log(event);
        event.preventDefault();

        //take imput city
        var inputCity = $('input').val();
        getCurrentWeatherData(inputCity);
    });


    //make ajax call

    function getCurrentWeatherData(city) {


        var queryURL = "http://api.openweathermap.org/data/2.5/weather?appid=16e2a29d08bf4766fcdb6563c3920b3d&units=imperial&q=" + city;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(res) {
            renderCurrentWeather(res);
        })

    }

    //return current weather
    function renderCurrentWeather(info) {
        console.log(info);
        
        var cityName = info.name;
        var dateTime = info.dt;

        var currentDate = dayjs.unix(dateTime).format('MM/DD/YYYY');
        




        //render current weather data
        $('#city-n-date').text(cityName + " (" + currentDate + ")");
        $('#city-temp').html("Temprature: " + info.main.temp + "&#8457");
        $('#city-humi').html("Humidity: " + info.main.humidity + "%");
        $('#city-wind').html("Wind Speed: " + info.wind.speed + " MPH");
        $('#city-uv').html("UV Index: ");

    };


    //return 5-day forcast
    function renderForcast() {

    }

    //save city as a button

    function createCityButton() {

    }
    function appendCityButton() {

    }

    //add to local storage, recently search cities list

    function saveRecentSearchToList() {

    }

    function hydrateDataFromLocalstorage() {

    }

    function renderButtons() {

    }



});