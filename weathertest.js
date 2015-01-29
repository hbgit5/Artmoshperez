
//API call for what is needed
$.ajax({
url: 'http://api.openweathermap.org/data/2.5/'

        //callback parameter 
        jsonp:'callback ',
        //expected in Json format
        datatype:'jsonp',
        //parse data for what is needed:
        q:'city ',
        units:'metric ',
        mode:'json ',
        description:'description',
        icon: 'icon '

});
//convert temperature from Kelvin to celcius or farenheit:

function convertTemperature(kelvin){
        return Math.round(DEG == 'c' ? (kelvin - 273.15) : (kelvin*9/5 - 459.67));
    }

//deal with response 
    function (response) {
    var temp=response.list[].main.temp;
        if(temp<25) {
        $('.message').html('it is cold');
            }else if (temp<35){
            $('.message').html('it is warm');
        } else if (temp<50) {
            $('.message').html('it is hot');}
                                };