// import movie data
const moviesJson = require('./movies.json');

// functino fro generating random number within certain range
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

class MovieAPI {
    // instantiating movie API with imported movie data, adding an unique "id" and a random “rating” from 1 to 5 for each movie before storing it.
    constructor(movies) {
        this.movies = movies;
        this.movies.forEach((movie, i) => {
            movie.id = i + 1;
        });
        this.movies.forEach((movie) => {
            movie.rating = randomNumber(1,5);
        });
    };

    // show all movie data.
    showAllMovies() {
        return this.movies;
    }

    // return movies from a certain genre.
    filterByGenre(genre) {
        return this.movies.filter((movie) => movie.genre.toLowerCase() == genre.toLowerCase());
    };

    // removes a movie with a certain id (if found).
    checkIdExist(id) {
        return this.movies.some((movie) => movie.id == id);
    };

    deleteById(id) {
        if (this.checkIdExist(id)) {
            this.movies.splice(id - 1, 1);
            return `Movie with id: ${id} is deleted.`;
        } else {
            return `Movie with id: ${id} is not found.`;
        };
    };

    // returns the movies wih the subtitle and thumb properties filtered out.
    hideSubtitleAndThumb() {
        return this.movies.map(({subtitle, thumb, ...remainkeys}) => remainkeys);
    };

    // returns the movies sorted by name.
    sortNameStatement(movie_a, movie_b) {
        if (movie_a.title.toLowerCase() > movie_b.title.toLowerCase()) {
            return 1;
        } else {
            return -1;
        };
    };

    sortedByName() {
        return this.movies.sort((movie_a, movie_b) => {
            this.sortNameStatement(movie_a, movie_b);
        });
    };

    // returns the movies first sorted by rating and then sorted by name.
    sortedByRatingAndName(){
        return this.movies.sort((movie_a, movie_b) => {
            if (movie_a.rating < movie_b.rating) {
                return 1;
            } else if (movie_a.rating > movie_b.rating) {
                return -1;
            } else {
                this.sortNameStatement(movie_a, movie_b);
            };
        });
    };

    // return the 2 top rated movies and 2 bottom rated movies.
    bestAndWorst() {
        const sortedMovies = this.sortedByRatingAndName();
        const bestTwo = sortedMovies.slice(0, 2);
        const worstTwo = sortedMovies.slice(sortedMovies.length - 2, sortedMovies.length)
        Array.prototype.push.apply(bestTwo, worstTwo);
        return bestTwo;
    };

    // prints out the three top rated movies.
    topThree() {
        const sortedMovies = this.sortedByRatingAndName();
        return sortedMovies.slice(0, 3);
    };

    // print out movies sorted from bottom rated to top rated.
    badToGood() {
        const sortedMovies = this.sortedByRatingAndName();
        return sortedMovies.reverse();
    };

    // allows the user to add a new movie object to the movie list (supply all properties but the “id” and “rating”).
    addMovie(description, sources, subtitle, thumb, title, genre) {
        const id = this.movies.length + 1;
        const rating = randomNumber(1, 5);
        this.movies.push({
            description, sources: [sources], subtitle, thumb, title, genre, id: id, rating: rating
        });
        return this.movies.slice(-1);
    };

    // returns a movie with a certain id (if found).
    searchById(id) {
        if (this.checkIdExist(id)) {
            return this.movies.slice(id - 1, id);
        } else {
            return `Movie with id: ${id} is not found.`;
        };
    };

    // changes the title of a movie with a certain id (if found).
    changeTitle(id, newTitle) {
        if (this.checkIdExist(id)) {
            const targetMovieIndex = this.movies.findIndex((movie) => movie.id == id);
            this.movies[targetMovieIndex].title = newTitle;
            return this.searchById(id);
        } else {
            return `Movie with id: ${id} is not found.`;
        };
    };
};

const API = new MovieAPI(moviesJson);
// console.log(API.showAllMovies());
// console.log(API.filterByGenre("sci-fi"));
// console.log(API.deleteById(4));
// console.log(API.hideSubtitleAndThumb());
// console.log(API.sortedByName());
// console.log(API.bestAndWorst());
// console.log(API.topThree());
// console.log(API.badToGood());
// console.log(API.addMovie("At the intersection of the near future and the reimagined past, waits a world in which every human appetite can be indulged without consequence.", "https://www.imdb.com/title/tt0475784/?ref_=hm_hp_cap_pri_3", "By Mojito", "images/westworld.jpg", "Westworld", "Sci-Fi"))
// console.log(API.addMovie("Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", "https://www.imdb.com/title/tt0111161/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=1a264172-ae11-42e4-8ef7-7fed1973bb8f&pf_rd_r=206G45E3YE401R2HZ56J&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=top&ref_=chttp_tt_1", "By Mojito", "images/theshawshankredemption.jpg", "The Shawshank Redemption", "Drama"))
// console.log(API.searchById(randomNumber(1, 20)));
// console.log(API.changeTitle(4, "New Title for The Movie"))

