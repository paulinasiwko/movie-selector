// Initial array of movies
const movies = ["The Matrix", "Dune", "Mr. Right", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  const movie = $(this).attr("data-name");
  const queryURL = `https://www.omdbapi.com/?t=${movie}&apikey=trilogy`;

  // Creates a Fetch call for the specific movie button being clicked
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // YOUR CODE GOES HERE!!!
      console.log(data.Poster);

      var movieDiv = $("<div class='movie'>");

      var rating = $("<p>").text("Rating: " + data.Rated);
      var realeseDate = $("<p>").text("Released: " + data.Released);
      var plot = $("<p>").text("Plot: " + data.Plot);
      var poster = $("<img>").attr("src", data.Poster);

      movieDiv.append(poster, rating, realeseDate, plot);
      $("#movies-view").prepend(movieDiv);
    });
}

// Function for displaying movie data
function renderButtons() {

  // Deletes the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Loops through the array of movies
  $.each(movies, function (i, movie) {

    // Then dynamically generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    const a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("movie");
    // Added a data-attribute
    a.attr("data-name", movie);
    // Provided the initial button text
    a.text(movie);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  })
}

// This function handles events where the add movie button is clicked
$("#add-movie").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  const movie = $("#movie-input").val().trim();

  // The movie from the textbox is then added to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();