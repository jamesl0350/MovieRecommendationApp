document
  .getElementById("search-button")
  .addEventListener("click", searchMovies);

function searchMovies() {
  const searchInput = document.getElementById("search-input").value.trim();
  if (searchInput === "") {
    alert("Please enter a movie title");
    return;
  }

  // Clear previous search results
  document.getElementById("movies-container").innerHTML = "";

  // Fetch movie data from TMDB API
  const apiKey = "4494bc1ef64dd84871f2757593edc4f3";
  const baseUrl = "https://api.themoviedb.org/3";
  const endpoint = "/search/movie";
  const url = `${baseUrl}${endpoint}?query=${encodeURIComponent(
    searchInput
  )}&api_key=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }
      return response.json();
    })
    .then((data) => {
      if (data.results && data.results.length > 0) {
        data.results.forEach((movie) => {
          displayMovie(movie);
        });
      } else {
        alert("No movies found");
      }
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
      alert(
        "An error occurred while fetching movie data. Please try again later."
      );
    });
}

function displayMovie(movie) {
  const moviesContainer = document.getElementById("movies-container");
  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");
  movieElement.innerHTML = `
                <img src="${
                  movie.poster_path
                    ? "https://image.tmdb.org/t/p/w200" + movie.poster_path
                    : "https://via.placeholder.com/100"
                }" alt="${movie.title}">
                <div class="movie-details">
                    <h2>${movie.title}</h2>
                    <p>Release Date: ${movie.release_date}</p>
                    <p>Rating: ${movie.vote_average}</p>
                    <p>${movie.overview}</p>
                </div>
            `;
  moviesContainer.appendChild(movieElement);
}
