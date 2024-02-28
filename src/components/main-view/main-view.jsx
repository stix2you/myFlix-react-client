// this version of main-view.jsx uses named exports to export the MainView component. 
// This means that when you import the component, you need to destructure it from the module. 
// Import the MainView component WITH curly braces:  import { MainView } from './path/to/main-view';  
// This MUST BE CHANGED in the index.jsx file to use this method

import { useState, useEffect } from "react";                   // import the useState hook from the react package
import { MovieCard } from "../movie-card/movie-card";  // import the MovieCard component from the movie-card module
import { MovieView } from "../movie-view/movie-view";  // import the MovieView component from the movie-view module  
import { PropTypes } from "prop-types";    // import the PropTypes library from the prop-types package

export const MainView = () => {              // create a functional component called MainView
    const [movies, setMovies] = useState([]);    // create a new piece of state called movies, an empty array, and a function called setMovies to update it
    const [selectedMovie, setSelectedMovie] = useState(null);   // create a new piece of state called selectedMovie, and a function called setSelectedMovie to update it

    useEffect(() => {   // the purpose of this function is to fetch data from an API and update the movies state with the data, 
        // useEffect is a hook that allows you to perform side effects in function components
        fetch("https://stix2you-myflix-5cbcd3c20372.herokuapp.com/movies")   // fetches data from the API, GET request to the /movies endpoint
            .then((response) => response.json())             // parses the JSON data from the response
            .then((data) => {                               
                console.log("movies from api:", data);          // logs the data to the console
                const moviesFromApi = data.map((doc) => {   // maps each element in the array to a new piece of UI, after execution will have <div>{movie.title}</div> for each movie in the array
                    return {
                        id: doc._id,
                        title: doc.Title,
                        releaseYear: doc.ReleaseYear,
                        rating: doc.Rating,
                        runtime: doc.Runtime,
                        description: doc.Description,
                        genres: doc.Genres,
                        director: doc.Director,
                        actors: doc.Actors,
                        image: doc.ImagePath
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);

    if (selectedMovie) {                             // if selectedMovie is truthy, return a new MovieView component
        return (                                    // returns a new MovieView component with the selectedMovie as a prop
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />  // onBackClick is a prop that's passed to the MovieView component
        );
    }

    if (movies.length === 0) {                       // if the length of the movies array is 0, return a message
        return <div>The list is empty!</div>;       // returns a message that says "The list is empty!"
    }

    return (                         // returns a new piece of UI
        <div>
            {movies.map((movie) => (   // maps each element in the array to a new piece of UI, after execution will have <div>{movie.title}</div> for each movie in the array
                <MovieCard        // returns a new MovieCard component for each movie in the array
                    key={movie.id}    // key is a special attribute that's used by React to keep track of the elements in the array -- it should be unique for each element
                    movie={movie}      // movie is a prop that's passed to the MovieCard component
                    onMovieClick={(newSelectedMovie) => {       // onMovieClick is a prop that's passed to the MovieCard component
                        setSelectedMovie(newSelectedMovie);     // when the MovieCard component calls onMovieClick, it will call setSelectedMovie with the newSelectedMovie as an argument (newSelectedMovie is the movie that was clicked on
                    }} />
            ))}
        </div>
    );

};

MainView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        releaseYear: PropTypes.string,
        rating: PropTypes.string,
        runtime: PropTypes.string,
        genres: PropTypes.array.isRequired,
        director: PropTypes.string.isRequired,
        actors: PropTypes.array.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,

    })),

    selectedMovie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        releaseYear: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        runtime: PropTypes.string.isRequired,
        genres: PropTypes.array.isRequired,
        director: PropTypes.string.isRequired,
        actors: PropTypes.array.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,

    }).isRequired
};

MainView.defaultProps = {
    movies: [],
    selectedMovie: {
        title: "Title",
        releaseYear: "Release Year",
        rating: "Rating",
        runtime: "Runtime",
        genres: ["Genre"],
        director: "Director",
        actors: ["Actors"],
        description: "Description",
        image: "Image",
    }
};