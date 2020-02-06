$(document).ready(function (){
  $('button').on('click', function (){
    var query = $("input").val().toLowerCase();
    $('input').val('').focus();
    if(query != '') {
      $.ajax(
        {
          url: 'https://api.themoviedb.org/3/search/movie',
          method: 'GET',
          data: {
            api_key: 'ed6b74196763d1becc194df37b95d2fd',
            query: query
          },
          success: function (data) {
            console.log(data);
            var films = data.results;
            console.log(films);
            printFilms(films);
            if(films.length == 0){
              alert('la tua richiesta non ha prodotto risultati');
            }

          },
          error: function (request, state, errors) {
            console.log(errors);
          }
        });
    }
  });
});

function printFilms (films) {
  $('.cover').html('');
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < films.length; i++) {
     var thisFilms = films[i];
     // console.log(thisFilms);
     var context = {
       title: thisFilms.title,
       original_title: thisFilms.original_title,
       original_language: thisFilms.original_language,
       vote_average: thisFilms.vote_average
     };
     var html = template(context);
     $('.cover').append(html);
  }
}

// 'title': "Back to the Future",
// "original_title": "Back to the Future",
// "original_language": "en",
// "vote_average": 8.2,

// "page": 1,
//     "total_results": 3,
//     "total_pages": 1,
//     "results": [
//         {
//             "popularity": 24.954,
//             "vote_count": 12242,
//             "video": false,
//             "poster_path": "/pTpxQB1N0waaSc3OSn0e9oc8kx9.jpg",
//             "id": 105,
//             "adult": false,
//             "backdrop_path": "/x4N74cycZvKu5k3KDERJay4ajR3.jpg",
//             "original_language": "en",
//             "original_title": "Back to the Future",
//             "genre_ids": [
//                 12,
//                 35,
//                 878,
//                 10751
//             ],
//             "title": "Back to the Future",
//             "vote_average": 8.2,
//             "overview": "Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadvertently disrupting his parents' first meeting and attracting his mother's romantic interest. Marty must repair the damage to history by rekindling his parents' romance and - with the help of his eccentric inventor friend Doc Brown - return to 1985.",
//             "release_date": "1985-07-03"
