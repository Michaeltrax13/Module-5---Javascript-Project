function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}

let movie 

async function renderMovies(moviesToRender) {
    const moviesWrapper = document.querySelector('.movie');
    document.body.classList += (' movie__loading');

    if (!movie) {
        movie = await getMovies();
    }

    const movieHTML = moviesToRender.map((movies) => {
        return `<div class="title">
            <div class="poster">
                <img id="dynamic-image" src="${movies.Poster}" alt="Dynamically loaded image">
            </div>
            <div class="movie__title">${movies.Title}</div>
            <div class="movie__year"><i class="fa-regular fa-calendar"></i>${movies.Year}</div>
            <div class="imdbID"><i class="fa-brands fa-imdb"></i>${movies.imdbID}</div>
            <div class="type"><i class="fa-solid fa-tv"></i>${movies.Type}</div>
        </div>`;
    }).join("");

    moviesWrapper.innerHTML = movieHTML;
}

// Initial render
setTimeout(() => {
    renderMovies(movie); // Render all movies initially
}, 1000);

/*async function renderMovies(filter) {
      
const moviesWrapper = document.querySelector('.movie')


 document.body.classList += (' movie__loading')
    
    if(!movie) {
        movie =await getMovies()
    }
     
    

    if(filter === 'A - Z') {
        movie.sort((a, b) => a.Title.localeCompare(b.Title))
    }
    else if(filter === 'Z - A') {
        movie.sort((a, b) => b.Title.localeCompare(a.Title))
    }
    else if(filter === 'Year') {
        movie.sort((a, b) => a.Year.localeCompare(b.Year))
    }
    else if(filter === 'imdbID') {
        movie.sort((a, b) => a.imdbID.localeCompare(b.imdbID))
    }
    else if(filter === 'Type') {
        movie.sort((a, b) => a.Type.localeCompare(b.Type))
    }

    const movieHTML = movie.map((movies) => {
        return  `<div class="title">
            <div class="poster">
                <img id="dynamic-image" src="${movies.Poster}" alt="Dynamically loaded image">
            </div>
            <div class="movie__title">
                ${movies.Title}
            </div>
            <div class="movie__year">
                <i class="fa-regular fa-calendar"></i>
                ${movies.Year}
            </div>
            <div class="imdbID">
                <i class="fa-brands fa-imdb"></i>
                ${movies.imdbID}
            </div>
            <div class="type">
                <i class="fa-solid fa-tv"></i>
                ${movies.Type}
            </div>
        </div>
    </div>`
    }).join("")

    
    moviesWrapper.innerHTML = movieHTML 
}

function filterMovies(event) {
    renderMovies(event.target.value)
}

setTimeout (() => {
    renderMovies()
}, 1000) */

/* const rangeInput = document.querySelectorAll(".range-input input"),
      priceInput = document.querySelectorAll(".slider__field input"),
      progress = document.querySelector(".slider .progress");

let priceGap = 3;

// Function to filter movies based on price range
function filterMoviesByPrice(minPrice, maxPrice) {
    const filteredMovies = movie.filter(m => m.Price >= minPrice && m.Price <= maxPrice);
    renderMovies(filteredMovies); // Pass the filtered movies to renderMovies
}

// Event listeners for price inputs
priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(priceInput[0].value),
            maxVal = parseInt(priceInput[1].value);

        if (maxVal - minVal >= priceGap) {
            if (e.target.className === "input-min") {
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            } else {
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
            filterMoviesByPrice(minVal, maxVal); // Call the filter function
        }
    });
});

// Event listeners for range inputs
rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
            if (e.target.className === "range-min") {
                rangeInput[0].value = maxVal - priceGap;
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            filterMoviesByPrice(minVal, maxVal); // Call the filter function
        }
    });
});

// Render movies function
async function renderMovies(filter) {
    const moviesWrapper = document.querySelector('.movie');
    document.body.classList += (' movie__loading');

    if (!movie) {
        movie = await getMovies();
    }

    // If filter is an array, use it; otherwise, sort the original movie array
    const moviesToRender = Array.isArray(filter) ? filter : movie;

    const movieHTML = moviesToRender.map((movies) => {
        return `<div class="title">
            <div class="poster">
                <img id="dynamic-image" src="${movies.Poster}" alt="Dynamically loaded image">
            </div>
            <div class="movie__title">${movies.Title}</div>
            <div class="movie__year"><i class="fa-regular fa-calendar"></i>${movies.Year}</div>
            <div class="imdbID"><i class="fa-brands fa-imdb"></i>${movies.imdbID}</div>
            <div class="type"><i class="fa-solid fa-tv"></i>${movies.Type}</div>
        </div>`;
    }).join("");

    moviesWrapper.innerHTML = movieHTML;
}

// Initial render
setTimeout(() => {
    renderMovies();
}, 1000);
 */


const toggleSearch = () => {
    const searchForm = document.querySelector('.search-form')
    const searchButton = document.querySelector('.search-button')
    const searchInput = document.querySelector('.search-input')
    const searchDisplay = document.querySelector(' .display__box')

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value
        searchForm.classList.toggle('active-search')

        renderMovies(null, searchTerm)
    })

    searchInput.addEventListener('input', () => {
        if (searchDisplay) {
            searchDisplay.textContent = searchInput.value
        } 
    })

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            searchInput.value = ''
            searchForm.classList.remove('active-search')
            console.log('Searching for:""', searchInput.value)
            searchInput.blur()   
            renderMovies(null, searchInput.value)
        }

    })

    
}

toggleSearch()

const rangeInput = document.querySelectorAll(".range-input input"),
      priceInput = document.querySelectorAll(".slider__field input"),
      submitButton = document.querySelector(".submit__button");

let priceGap = 0; // Set to 0 for no minimum gap

// Function to filter movies based on the selected range
function filterMoviesByCount(minCount, maxCount) {
    const filteredMovies = movie.slice(0, maxCount); // Get movies from 0 to maxCount
    renderMovies(filteredMovies); // Render the filtered movies
}

// Add event listener to the submit button
submitButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default form submission
    let minVal = parseInt(priceInput[0].value),
        maxVal = parseInt(priceInput[1].value);

    // Even if minVal equals maxVal, we can still filter
    filterMoviesByCount(minVal, maxVal); 
});

// Event listeners for price inputs
priceInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(priceInput[0].value),
            maxVal = parseInt(priceInput[1].value);

        // Update range inputs without any restrictions
        rangeInput[0].value = minVal;
        rangeInput[1].value = maxVal;
    });
});

// Event listeners for range inputs
rangeInput.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        // Allow sliders to move freely as priceGap is 0
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
    });
});

/*const rangeInput = document.querySelectorAll(" .range-input input"),
priceInput = document.querySelectorAll(" .slider__field input"),
progress = document.querySelector(" .slider .progress")

let priceGap = 3

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        // get two inputs value and parsing them to number
        let minVal = parseInt(priceInput[0].value),
        maxVal = parseInt(priceInput[1].value)

        if(maxVal - minVal >= priceGap){
            if(e.target.className === "input-min"){ //if active input in min input
                rangeInput[0].value = minVal
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%"
            }else{
                rangeInput[1].value = maxVal
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"
            }
        }

    })
})
rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        // get two ranges value and parsing them to number
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value)

        if(maxVal - minVal < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap
            }
        }else{
            priceInput[0].value = minVal
            priceInput[1].value = maxVal
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%"
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%"
        }

    })
})*/





/* Movie Data */

function getMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
        {
        Title: "Resident Evil",
        Year: "2002",
        imdbID: "tt0120804",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BYmI3YjJkN2ItY2ZmYS00Y2JhLTk2YTQtYzE5YWU5ODI1MzJmXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
        Title: "Resident Evil: Apocalypse",
        Year: "2004",
        imdbID: "tt0318627",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTc1NTUxMzk0Nl5BMl5BanBnXkFtZTcwNDQ1MDIzMw@@._V1_SX300.jpg"
        },
        {
        Title: "Resident Evil: Extinction",
        Year: "2007",
        imdbID: "tt0432021",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BYzk4YjU4ZTItNTYwNi00ZjZkLTlhMzEtODkyMWEwN2JkN2Q4XkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
        Title: "Resident Evil: Afterlife",
        Year: "2010",
        imdbID: "tt1220634",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BNTgyZmNmNjctMTdlNC00NjEzLWIwZjAtYzRmNGQzYWIzOGFmXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
        Title: "Resident Evil: Retribution",
        Year: "2012",
        imdbID: "tt1855325",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BNGJhZTNlNmYtN2YwNi00OWQwLThhNTUtY2NlOTYwZTQ5ZjNiXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
        Title: "Resident Evil: The Final Chapter",
        Year: "2016",
        imdbID: "tt259261",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTc0Mzc2OTQ0Ml5BMl5BanBnXkFtZTgwOTQ5MjE4MDI@._V1_SX300.jpg"
        },
        {
        Title: "Resident Evil: Welcome to Raccoon City",
        Year: "2021",
        imdbID: "tt6920084",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BMDA5MTZlZDEtYzhiYi00MWIyLWI1NWMtNTA0OGY4NWI5ZGVlXkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
        Title: "Resident Evil",
        Year: "2022",
        imdbID: "tt9660182",
        Type: "series",
        Poster: "https://m.media-amazon.com/images/M/MV5BMGI5NGE2ZWMtM2M5OC00NDY0LWJjMzAtYjU5NWRhZTQyY2U0XkEyXkFqcGc@._V1_SX300.jpg"
        },
        {
        Title: "Resident Evil: Degeneration",
        Year: "2008",
        imdbID: "tt1174954",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BYTU0NTQ2NmEtZTQ5Yi00Nzk5LWI3MzEtY2M3MDk1MjIyMTI1XkEyXkFqcGc@._V1_SX300.jpg"
        }
    ])
        }, 1000)
    })
} 

/*function movieHTML(movie) {
 return `<div class="movie">
                    <div class="movie__title">
                        ${movie.Title}
                    </div>
                    <div class="movie__year">
                        ${movie.Year}
                    </div>
                    <div class="imdbID">
                        ${movie.imdbID}
                    </div>
                    <div class="type">
                        ${movie.Type}
                    </div>
                    <div class="poster">
                        <figure class="poster__img">
                            <img src="${movie.Poster}">
                        </figure>
                    </div>
                </div>`
}*/
