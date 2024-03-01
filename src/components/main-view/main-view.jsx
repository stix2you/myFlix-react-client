import { useState, useEffect } from "react";                   // import the useState hook from the react package
import { MovieCard } from "../movie-card/movie-card";  // import the MovieCard component from the movie-card module
import { MovieView } from "../movie-view/movie-view";  // import the MovieView component from the movie-view module 
import { LoginView } from "../login-view/login-view";  // import the LoginView component from the login-view module 
import { SignupView } from "../signup-view.jsx/signup-view"; // import the SignupView component from the signup-view module
import { PropTypes } from "prop-types";    // import the PropTypes library from the prop-types package
import Container from 'react-bootstrap/Container';  // import the Container component from the react-bootstrap package
import Row from 'react-bootstrap/Container';  // import the Row component from the react-bootstrap package
import Col from 'react-bootstrap/Col';

export const MainView = () => {              // create a functional component called MainView
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);    // create a new piece of state called movies, an empty array, and a function called setMovies to update it
    const [selectedMovie, setSelectedMovie] = useState(null);   // create a new piece of state called selectedMovie, and a function called setSelectedMovie to update it


    useEffect(() => {   // the purpose of this function is to fetch data from an API and update the movies state with the data, 
        if (!token) {     // if the token is falsy, return from the function, falsy values are: false, 0, "", null, undefined, and NaN
            return;     // if the token is falsy, return from the function
        }

        fetch("https://stix2you-myflix-5cbcd3c20372.herokuapp.com/movies", {  // fetches data from the API, GET request to the /movies endpoint
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())             // parses the JSON data from the response
            .then((movies) => {
                setMovies(movies);         // updates the movies state with the data from the API
                console.log("movies from api:", movies);          // logs the data to the console
                const moviesFromApi = movies.map((doc) => {   // maps each element in the array to a new piece of UI, after execution will have <div>{movie.title}</div> for each movie in the array
                    return {
                        id: doc._id,
                        title: doc.Title,
                        director: doc.Director,
                        releaseYear: doc.ReleaseYear,
                        rating: doc.Rating,
                        runtime: doc.Runtime,
                        description: doc.Description,
                        genres: doc.Genres,
                        actors: doc.Actors,
                        image: doc.ImagePath
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);   // the second argument to useEffect is an array of dependencies, when the dependencies change, the effect is re-run


    return ( 
                             
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8} style={{ border: "1px solid black" }}>
                    <MovieView
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)} />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col key={movie.id} md={3}>
                        <MovieCard
                            // key={movie.id}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                        </Col>
                    ))}
                </>
            )}
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </Row >
        
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