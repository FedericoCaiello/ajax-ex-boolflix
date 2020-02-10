$(document).ready(function (){
  $('button').on('click', function (){
    $('.cover').html('');
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
            console.log(query);
            console.log(data);
            var films = data.results;
            console.log(films);
            if(films.length > 0){
              printFilms(films);

            }
          },
          error: function (request, state, errors) {
            console.log(errors);
          }
        });
        $.ajax(
          {
            url: 'https://api.themoviedb.org/3/search/tv',
            method: 'GET',
            data: {
              api_key: 'ed6b74196763d1becc194df37b95d2fd',
              query: query
            },
            success: function (data) {
              console.log(query);
              console.log(data);
              var serieTv = data.results;
              console.log(serieTv);
              if(serieTv.length > 0) {
                printSerieTv(serieTv);
              }
            },
            error: function (request, state, errors) {
              console.log(errors);
            }
          }
        );
    }
  });
});
function printFilms (films) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < films.length; i++) {
     var thisFilms = films[i];
     var context = {
       title: thisFilms.title,
       original_title: thisFilms.original_title,
       original_language:printFlags(thisFilms.original_language),
       vote_average: printStars(thisFilms.vote_average),
       poster_path: posterPrint(thisFilms.poster_path)
     };
     var html = template(context);
     $('.cover').append(html);
  }
}
function printSerieTv (serie) {
  var source = $("#second-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < serie.length; i++) {
     var questaSerie = serie[i];
     var context = {
       name: questaSerie.name,
       original_name: questaSerie.original_name,
       original_language:printFlags(questaSerie.original_language),
       vote_average: printStars(questaSerie.vote_average),
       poster_path: posterPrint(questaSerie.poster_path)
     };
     var html = template(context);
     $('.cover').append(html);
  }
}
function printStars(voto) {
  var voto = Math.round(voto / 2);
  var stelle = '';
  for (var i=1; i<=5; i++) {
    if (i <= voto) {
      var singolaStella = '<i class="fas fa-star"></i>';
    }else {
      var singolaStella = '<i class="far fa-star"></i>';
    }
    stelle += singolaStella;
  }
  return stelle;
}

function posterPrint(poster) {
  var url = 'https://image.tmdb.org/t/p/w185';
  if (poster != null) {
    url += poster;
  }else {
    url = 'img/image_not_found.png';
  }
  return url;
}

function printFlags(stringa) {
  var bandiere = [
    'en',
    'it',
    'fr',
    'ru',
    'zh'
  ];
  if (bandiere.includes(stringa)) {
    stringa = '<img class="lang" src="img/flag-of-' + stringa + '.png" alt="language">';
  }
  return stringa;
}
