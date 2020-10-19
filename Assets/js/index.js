$(document).ready(function () {
    //store city name
    var recentCityNames = [];

    $('#submit').on('click', function (event) {
        console.log(event);
        event.preventDefault();

        //take imput city
        var input = $('input').val();
        console.log(input);

    });


    //make ajax call

    function getWeatherData() { }










    //return current weather
    function renderCurrentWeather() {

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