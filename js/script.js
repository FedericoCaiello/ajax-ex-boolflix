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
     voto = getRandomInclusive(1, 5);

     var context = {
       title: thisFilms.title,
       original_title: thisFilms.original_title,
       original_language: thisFilms.original_language,
       vote_average: printStars(thisFilms.vote_average),

     };
     var html = template(context);
     $('.cover').append(html);
  }
}
function getRandomInclusive (min, max) {
  min = Math.ceil(min) ;
  max = Math.floor(max) ;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function printStars(voto) {
  var voto = Math.round(voto / 2);
  var stelle = '';
  for (var i=0; i<=5; i++) {
    if (i <= voto) {
      var singolaStella = '<i class="fas fa-star"></i>';
    }else {
      var singolaStella = '<i class="far fa-star"></i>';
    }
    stelle += singolaStella;
  }
  return stelle;
}
