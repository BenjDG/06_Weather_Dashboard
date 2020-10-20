$(document).ready(function () {
    //store city name
    var recentCityNames = [];
    hydrateDataFromLocalstorage();
    $('#submit').on('click', function (event) {
        event.preventDefault();
        $('#main-page').removeClass('is-hidden');
        //take imput city
        var inputCity = $('input').val();
        $('input').val("");
        getCurrentWeatherData(inputCity);
        buttonFactory(inputCity);
        saveRecentSearchToList(inputCity);
    });
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
        getForcast(lat, lon);
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
                    if (res.value < 3) {
                        $('#city-uv').html(" " + res.value).attr('class', 'has-background-success');
                    } else if (res.value >= 3 && res.value < 8) {
                        $('#city-uv').html(" " + res.value).attr('class', 'has-background-warning');
                    } else {
                        $('#city-uv').html(" " + res.value).attr('class', 'has-background-danger');
                    }
                });
        }
    };
    //return 5-day forcast
    function getForcast(lat, lon) {
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly,alerts&appid=16e2a29d08bf4766fcdb6563c3920b3d";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (res) {
                $('#forecast-card').empty();
                for (var i = 0; i < 5; i++) {
                    $div = $('<div>').attr('class', 'tile is-block');
                    $date = $('<p>').text(dayjs.unix(res.daily[i].dt).format('MM/DD/YYYY'));
                    $image = $('<img>').attr('src', 'http://openweathermap.org/img/wn/' + res.daily[i].weather[0].icon + '@2x.png').attr('alt', res.daily[i].weather[0].description);
                    $temp = $('<p>').html("Temp: " + toF(res.daily[i].feels_like.day) + "&#8457");
                    $humi = $('<p>').text("Humidity: " + res.daily[i].humidity + "%");
                    $div.append($date, $image, $temp, $humi);
                    $('#forecast-card').append($div);
                }
            })
    }
    //save city as a button
    function buttonFactory(cityName) {
        var $button = $('<button>')
        $button.text(cityName);
        $button.attr('class', 'button is-block m-1');
        $('#button-list').prepend($button);
        addButtonListener();
    }
    //addButtonListener();
    function addButtonListener() {
        var $button = $('#button-list').children();
        $button.each(function () {
            $button.on('click', function (evt) {
                //evt.preventDefault();
                $('#main-page').removeClass('is-hidden');
                getCurrentWeatherData(evt.target.textContent);
            });
        });
    }
    //add to local storage, recently search cities list
    function saveRecentSearchToList(city) {
        recentCityNames.push(city);
        localStorage.setItem('recentCityStorage', JSON.stringify(recentCityNames));
    }
    function hydrateDataFromLocalstorage() {
        var recentCityStorage = JSON.parse(localStorage.getItem('recentCityStorage'));
        if (recentCityStorage !== null) {
            recentCityNames = recentCityStorage;
            for (let i = 0; i < recentCityNames.length; i++) {
                buttonFactory(recentCityNames[i]);
            }
        }
    }
    function toF(k) {
        var f = (k - 273.15) * 9 / 5 + 32;
        return f.toFixed();
    }
});