
import { useState, useEffect } from "react";                 
import { MovieCard } from "../movie-card/movie-card";  
import { MovieView } from "../movie-view/movie-view"; 
import { LoginView } from "../login-view/login-view"; 
import { SignupView } from "../signup-view.jsx/signup-view";
import { PropTypes } from "prop-types";  
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

export const MainView = () => {             
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);   
    const [selectedMovie, setSelectedMovie] = useState(null);  


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
                <Col className="mb-5" md={4}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Row className="justify-content-md-center">
                    <Col md={10}>
                        <MovieView
                            movie={selectedMovie}
                            onBackClick={() => setSelectedMovie(null)} />
                    </Col>
                </Row>
            ) : movies.length === 0 ? (
                <h2 style={{
                    position: 'fixed', // Use 'fixed' or 'absolute' depending on the use case
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center' // This centers the text inside the h2 element itself
                }}>Loading Book Data . . .</h2>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mt-4 mb-4" key={movie.id} md={3} >
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
            {user && (     // if user is truthy (logged in), display the Logout button, otherwise skip it
                <Row className="justify-content-md-center mt-4">
                    <Col md={8}>
                        <Button
                            className="btn-lg"
                            style={{ width: '100%', cursor: 'pointer' }}
                            variant="primary"
                            onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>
                            Logout
                        </Button>
                    </Col>
                </Row>
            )}
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