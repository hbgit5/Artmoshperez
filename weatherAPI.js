var openweather_container;
var current_OW_page = 1;
var OWeather_api_key = '43f92e3379f3e006a42c3ee695e2d066';
var OW_api_url='http://api.openweathermap.org/data/2.5/forecast/daily?q=Martha+Lake,WA&units=imperial&cnt=7&APPID=43f92e3379f3e006a42c3ee695e2d066”';
/**
 * Renders the weather status for a city.
 */
(function ($) {
    
    
  /**
   * Process the form on page load.
   */
  $(document).ready(function() {
    $('#weather_city').val(''),
    $('#units_metric').attr('checked', 'checked');
    processForm();
  });
 
  /**
   * Callback to process the form.
   */
  function processForm() {
    // See http://openweathermap.org/API#weather.
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily?',
      jsonp: 'callback',
      dataType: 'jsonp',
      cache: false,
      data: {
        q: $('#weather_city').val(),
        units: $('#weather_status_form input[name="units"]:checked').val()
      },
      // work with the response
      success: function (response) {
        $('#weather_description').text(response.weather[0].description);
        $('#weather_temp').text(response.main.temp);
        $('#weather_wind').text(response.wind.speed);
      },
    });
  }
});

$(<').click(function(){
    $("#city-box").append("");
  });

