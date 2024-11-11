const searchBox = document.getElementById('movie-search-box');
const searchResults = document.getElementById('search-list');
const resultsGrid = document.getElementById('result-grid');

async function fetchMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=598947e`;
    const response = await fetch(URL);
    const data = await response.json();
    if (data.Response === "True") displaySearchResults(data.Search);
}

function searchMovies() {
    let searchTerm = searchBox.value.trim();
    if (searchTerm.length > 0) {
        searchResults.classList.remove('hide-search-list');
        fetchMovies(searchTerm);
    } else {
        searchResults.classList.add('hide-search-list');
    }
}

function displaySearchResults(movies) {
    searchResults.innerHTML = "";
    movies.forEach(movie => {
        const resultItem = document.createElement('div');
        resultItem.dataset.id = movie.imdbID;
        resultItem.classList.add('search-item');
        
        const moviePoster = movie.Poster !== "N/A" ? movie.Poster : "noimage.png";
        
        resultItem.innerHTML = `
            <div class="search-item-content">
                <div class="search-item-thumbnail">
                    <img src="${moviePoster}" alt="movie poster">
                </div>
                <div class="search-item-info">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                </div>
            </div>
        `;
        searchResults.appendChild(resultItem);
    });
    attachMovieDetailsEvents();
}

function attachMovieDetailsEvents() {
    const movieItems = searchResults.querySelectorAll('.search-item');
    movieItems.forEach(item => {
        item.addEventListener('click', async () => {
            searchResults.classList.add('hide-search-list');
            searchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${item.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultsGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${details.Poster !== "N/A" ? details.Poster : "noimage.png"}" alt="movie poster">
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-details">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b> ${details.Genre}</p>
            <p class="writer"><b>Writer:</b> ${details.Writer}</p>
            <p class="actors"><b>Actors:</b> ${details.Actors}</p>
            <p class="plot"><b>Plot:</b> ${details.Plot}</p>
            <p class="language"><b>Language:</b> ${details.Language}</p>
            <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
        </div>
    `;
}

window.addEventListener('click', (event) => {
    if(event.target.className != "form-input"){
        searchResults.classList.add('hide-search-list');
    }
});
