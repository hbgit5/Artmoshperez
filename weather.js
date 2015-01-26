


$('#add').click(function(){
 
 var city = $('.city_names').val();
//console.log(city);
 $.ajax({
     url: "http://api.openweathermap.org/data/2.5/find",
  
     // name of the callback parameter
     jsonp: "callback",
  
     // tell jQuery we're expecting JSONP
     dataType: "jsonp",
  
     //what we want
     data: {
         q: city,
         units:"metric",
         mode: "json"
     },
  
     // work with the response
     success: function( response ) { 
        
      
             var temp = response.list[0].main.temp;
             
             if(temp<25 ){
              $('.message').html("it's feels cold, get a jacket");
             }else if(temp<35){
              $('.message').html("it's feels normal"); 
             }else if(temp<50){
              $('.message').html("it's feels hot, switch on your AC");
             }

        $('.city').html(response.list[0].name);
        $('.country').html('( </span><span>'+response.list[0].sys.country+'</span><span> )');
        $('.temp').html('<span>'+response.list[0].main.temp+'</span><span class="t">* C</span>');
       
    
     }
 });
});
$(document).ready(function(){
});