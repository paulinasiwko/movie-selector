const movies = ["Dune", "Forrest Gump", "Finding Nemo", "The Shawshank Redemption"];

function displayMovieInfo() {

  const movie = $(this).attr("data-name");
  const queryURL = `https://www.omdbapi.com/?t=${movie}&apikey=trilogy`;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      var movieDiv = $("<div class='movie'>");

      var rating = $("<p>").text("Rating: " + data.Rated);
      var realeseDate = $("<p>").text("Released: " + data.Released);
      var plot = $("<p>").text("Plot: " + data.Plot);
      var poster = $("<img>").attr("src", data.Poster);

      movieDiv.append(poster, rating, realeseDate, plot);
      $("#movies-view").prepend(movieDiv);
    });
}

function renderButtons() {

  $("#buttons-view").empty();

  $.each(movies, function (i, movie) {
    const a = $("<button>");
    a.addClass("movie");
    a.attr("data-name", movie);
    a.text(movie);
    $("#buttons-view").append(a);
  })
}

$("#add-movie").on("click", function (event) {
  event.preventDefault();
  const movie = $("#movie-input").val().trim();

  movies.push(movie);

  renderButtons();
});

$(document).on("click", ".movie", displayMovieInfo);

renderButtons();