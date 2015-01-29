var paint_map = {
    'Clouds': [
        {
            'img': 'Albert_Bierstadt_-_Wind_River_Country_-_Google_Art_Project.jpg',
            'desc': 'Wind River Country, by Albert Bierstadt, German-American, 1860, oil on canvas, Denver Art Museum. Wyoming, Wind River Range mountains, along the Wind River, which is otherwise known as the Bighorn River in its lower reaches.'
        },
        {
            'img': 'John_Constable_-_Wivenhoe_Park,_Essex_-_Google_Art_Project.jpg',
            'desc': 'Wivenhoe Park, by John Constable, English, 1816, oil on canvas, National Galery of Art, Washington, D.C. Commissioned by Major General Francis Slater-Rebow as a depiction if the Rebow family estate.'
        }
    ],
    'gray': [
        {
            'img': 'Albert_Bierstadt_-_California_Spring_-_Google_Art_Project.jpg',
            'desc': 'California Spring, by Albert Bierstadt, German-American, 1875, oil on canvas, Fine Arts Museums of San Francisco. Sacramento River Valley, the then-recently-completed state capitol building is visible on the horizon.'
        },
        {
            'img': 'Karl_Nordström_-_Storm_Clouds_-_Google_Art_Project.jpg',
            'desc': 'Storm Clouds, or Storm Arising, Karl Nordström, Swedish, 1893, oil on canvas, Nationalmuseum, Sweden. A scene from Tjörn, Sweden, near the artist’s place of birth.'
        }
    ],
    'Rain': [
        {
            'img': 'Gustave_Caillebotte_-_Paris_Street;_Rainy_Day_-_Google_Art_Project.jpg',
            'desc': 'Paris Street; Rainy Day, by Gustave Caillebotte, French, 1877, oil on canvas, Art Institute of Chicago. Depicts the Carrefour de Moscou(Place de Dublin) east of the Gare Saint-Lazare, Paris. Debuted at the Third Impressionist Exhibition of 1877.'
        },
        {
            'img': 'Gustave_Courbet_-_The_Gust_of_Wind_-_Google_Art_Project.jpg',
            'desc': 'The Gust of Wind, Gustave Courbet, French, ca. 1865, oil on canvas, The Museum of Fine Arts, Houston. Commissioned by the Duke de Bojano, likely depicts a scene from the Forest of Fontainebleau near Paris.'
        },
        {
            'img': 'Vincent_Willem_van_Gogh,_Dutch_-_Rain_-_Google_Art_Project.jpg',
            'desc': 'Rain or Enclosed Wheat Field in the Rain, by Vincent Van Gogh, French, 1889, oil on canvas, Philadelphia Museum of Art, Philadelphia (F650). Depicts a wheat field adjacent to the sanatorium of Saint-Paul-de-Mausolée, France, one of twelve views depicted by Van Gogh from his workroom in the clinic.'
        }
    ],
    'Snow': [
        {
            'img': 'Winter_landscape_Paul_Gauguin.jpg',
            'desc': 'Winter Landscape, Effect of Snow, Paul Gauguin, French, 1879, oil on canvas, Museum of Fine Arts, Budapest. Also known as Snow at Vaugirard II.'
        },
        {
            'img': 'David_Cox_-_Shepherding_the_Flock,_Windy_Day_-_Google_Art_Project.jpg',
            'desc': 'Shepherding the Flock, Windy Day, by David Cox the Elder, English, 1848, watercolor and graphite on paper, Yale Center for British Art, Paul Mellon Collection. A scene near Birmingham, England.'
        },
        {
            'img': 'Hiroshige16_kanbara.jpg',
            'desc': 'Evening Snow at Kanbara, by Ando Hiroshige, Japanese, 1834, woodblock print on paper. Part of the series “Fifty-three Stations of the Tokaido”.'
        }
    ],
    'Clear': [
        {
            'img': 'Baigneurs_a_Asnieres.jpg',
            'desc': 'Bathers at Asnières, by Georges Pierre Seurat, French, 1884, oil on canvas, National Gallery, London. Depicts bathers in the Seine in the commune of Courbevoie, adjacent to the bridges of Asnières, opposite the Island of la Grande Jatte, scene of Seurat’s most famous painting.'
        },
        {
            'img': 'George_Inness_003.jpg',
            'desc': 'The Lackawanna Valley, by George Inness, American, c. 1855, oil on canvas, National Gallery of Art, Washington, D.C. Painting commissioned by John Jay Phelps depicting the Lackawanna Valley in Pennsylvania.'
        }
    ]

}





//getting the weather data from openweathermap API
var template_container;
var city_box_container;
var DEG = 'f';

$(function () {
    template_container = $('#hidden-template-container');
    city_box_container = $('#city-box-container');
    
    /* When submit button is clicked, create an AJAX call to the weather API
    using the city name from the input field */
    $('#location-form').submit(function () {
        var city = $('.city_names').val();
   

        // Construct query string to send to API
        var params = {
                q: city
            }
            //random painting generator



        //load 

        var loading_box = $(template_container.find('#loading-box-template').html());
        city_box_container.append(loading_box);

        // Make GET AJAX call
        $.getJSON('http://api.openweathermap.org/data/2.5/weather', params,
            function (response) {

                var city_box = template_container.find('#city-box-template').html();

                var painting = randomConditionImage(response.weather[0].main);

                // Replace placeholders with data from the API
                city_box = city_box
                    .replace('{CITY}', response.name)
                    .replace('{COUNTRY}', response.sys.country)
                    .replace('{ICON}', response.weather[0].icon)
                    .replace('{DESC}', response.weather[0].description)
                    .replace('{TEMP}', convertTemperature(response.main.temp))
                    .replace('{LOC_ID}', response.id)
                    .replace('{LOC}', city);


                city_box = $(city_box);

                // Insert city_box into its container
                city_box.find('.city-box').css('backgroundImage', 'url(img/'+painting.img+')');
                loading_box.html(city_box);
                //city_box_container.append(city_box);
            }
        );

        return false;
    });
});



function convertTemperature(kelvin) {
    return Math.round(DEG == 'c' ? (kelvin - 273.15) : (kelvin * 9 / 5 - 459.67));
}

//remove the appended div by clicking button
$('#city-box-container').on('click', '.delete_button', remove_city_box);

function randomConditionImage(condition) {
        var random_index = Math.floor((Math.random() * paint_map[condition].length));
        return paint_map[condition][random_index];
    }

function remove_city_box() {
    $(this).parent().parent().parent().parent().remove();
}