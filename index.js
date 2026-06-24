function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}
// the loading spinner function



//this section will filter your movies

function filterMovies(event) {
    console.log(event)
    
    const selectedFilter = event.target.value;
    let sortedMovies = [...movies]; // Create a copy of the movies array
    console.log(sortedMovies)
    
    
    
    // Sort based on the selected filter
    if (selectedFilter === 'A - Z') {
        sortedMovies.sort((a, b) => {
            if (a.Title && b.Title) { // Check if title exists
                return a.Title.localeCompare(b.Title);
            }
            return 0; // If title is missing, keep original order
            hideLoadingElements()
        });
    } else if (selectedFilter === 'Z - A') {
        sortedMovies.sort((a, b) => {
            if (a.Title && b.Title) { // Check if title exists
                return b.Title.localeCompare(a.Title);
            }
            return 0; // If title is missing, keep original order
        });
    } else if (selectedFilter === 'Year') {
        sortedMovies.sort((a, b) => a.Year.localeCompare(b.Year)); // Assuming Year is a numeric value
    } else if (selectedFilter === 'imdbID') {
        sortedMovies.sort((a, b) => a.imdbID.localeCompare(b.imdbID));
    } else if (selectedFilter === 'Type') {
        // Add your sorting logic for Type here
    }

    // Update the display with sortedMovies
    
    
        displayMovies(sortedMovies); 
}

function searchMovies(query) {

    const filteredMovies = movies.filter(movie => movie.Title.includes(query));

    // After searching, display the filtered movies
    displayMovies(filteredMovies); // Make sure to use a display function
}

let movies = []; // This should be populated with your fetched movie data

// Define an asynchronous function to fetch movie data
async function fetchMovies(searchTerm) {
    // The URL for the OMDB API
    const url = `https://www.omdbapi.com/?apikey=730421ab&s=${encodeURIComponent(searchTerm)}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        movies = data.Search || []; // Store the fetched movies here
        setTimeout(() => {displayMovies(movies)}, 2000); // Call the display function to show movies
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}


function displayMovies(movies) {
    const moviesWrapper = document.querySelector('.movie');
    moviesWrapper.innerHTML = ''; // Clear previous movies
    movies.forEach(movie => {
        const movieElement = document.createElement('movie__info');
        movieElement.innerHTML = `<img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" class="poster" alt="${movie.Title} poster"><h3 class="movie__title">${movie.Title}</h3><p class="movie__year">${movie.Year}</p><p class="imdbID">${movie.imdbID}</p><p class="type">${movie.Type}</p>`;
        moviesWrapper.appendChild(movieElement);
    }) ;
}
setTimeout(() => {fetchMovies('your initial search term')}, 2000);



function toggleSearch () {
    // Select necessary DOM elements
    const searchForm = document.querySelector('.search-form');
    const searchButton = document.querySelector('.search__button');
    const searchInput = document.querySelector('#search__input');
    const loadingBar = document.querySelector('.md-progress-bar')
    const searchDisplay = document.getElementById('display__txt'); // Display box for results
    



    // Add event listener for search button
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('Displaying loading elements')
            fetchMovies(searchTerm)
                .then(() => {
                    searchDisplay.style.display = 'block';
                })
                .catch(error => {
                    console.error('Error fetching movies:', error);
                })
        }
        searchForm.classList.toggle('active-search');
    });

    // Handle Enter key for searching
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                fetchMovies(searchTerm)
                    .then(movies => {
                        searchDisplay.style.display = 'block';
                    })
                    .catch(error => {
                        console.error('Error fetching movies:', error);
                    })
            }
            searchInput.value = '';
            searchForm.classList.remove('active-search');
            searchInput.blur();   
        }
    });
};

setTimeout(() => {toggleSearch()},2000); 


/*function displayLoadingElements() {
    const loadingSpinner = document.querySelector('.fa-spinner')
    const loadingBar = document.querySelector('.md-progress-bar')

    console.log('Showing spinner...');
    if(loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }
    if(loadingBar) {
        loadingBar.style.display = 'block'
    }
}

function hideLoadingElements() {
    const loadingSpinner = document.querySelector('.fa-spinner')
    const loadingBar = document.querySelector(' .md-progress-bar')

    console.log('Hiding spinner...');
    if(loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
        if(loadingBar) {
        loadingBar.style.display = 'none'
    }
}*/
