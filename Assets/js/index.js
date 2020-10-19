$(document).ready(function () {
    //store city name
    var recentCityNames = [];
    hydrateDataFromLocalstorage();
    //console.log(recentCityNames);


    $('#submit').on('click', function (event) {
        //console.log(event);
        event.preventDefault();


        //take imput city
        var inputCity = $('input').val();
        getCurrentWeatherData(inputCity);
        buttonFactory(inputCity);
        saveRecentSearchToList(inputCity);
        console.log(inputCity);
        console.log(recentCityNames);
    });


    addButtonListener();
    function addButtonListener() {
        var $button = $('#button-list').children();
        $.each($button, function () {
            $button.on('click', function (evt) {
                evt.preventDefault();
                //console.log(evt.target.textContent);
                getCurrentWeatherData(evt.target.textContent);
            });
        });
    }
    //make ajax call
    function getCurrentWeatherData(city) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?appid=16e2a29d08bf4766fcdb6563c3920b3d&units=imperial&q=" + city;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (res) {
                renderCurrentWeather(res);
            })
    }

    //return current weather
    function renderCurrentWeather(info) {
        var cityName = info.name;
        var dateTime = info.dt;
        var currentDate = dayjs.unix(dateTime).format('MM/DD/YYYY');
        var lat = info.coord.lat;
        var lon = info.coord.lon;

        //render current weather data
        renderUV(lat, lon);
        $('#city-n-date').text(cityName + " (" + currentDate + ")");
        $('#city-temp').html("Temprature: " + info.main.temp + "&#8457");
        $('#city-humi').html("Humidity: " + info.main.humidity + "%");
        $('#city-wind').html("Wind Speed: " + info.wind.speed + " MPH");
        function renderUV(latitude, longitude) {
            var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=16e2a29d08bf4766fcdb6563c3920b3d";
            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (res) {
                    $('#city-uv').text("UV Index: " + res.value);
                });
        }
    };
    //return 5-day forcast
    function renderForcast() {

    }

    //save city as a button

    function buttonFactory(cityName) {
        var $button = $('<button>')
        $button.text(cityName);
        $button.attr('class', 'button is-block m-1');
        $('#button-list').prepend($button);
        addButtonListener();

    }
    //add to local storage, recently search cities list
    function saveRecentSearchToList(city) {
        console.log(recentCityNames);
        recentCityNames.push(city);
        localStorage.setItem('recentCityStorage', JSON.stringify(recentCityNames));


        //console.log(recentCityNames);

    }

    function hydrateDataFromLocalstorage() {
        console.dir(recentCityNames);
        var recentCityStorage = JSON.parse(localStorage.getItem('recentCityStorage'));
        if (recentCityStorage !== null) {
            recentCityNames = recentCityStorage;
            for (let i = 0; i < recentCityNames.length; i++) {
                buttonFactory(recentCityNames[i]);
            }
        }
    }

});