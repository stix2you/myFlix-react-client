import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { PropTypes } from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
   const storedUser = JSON.parse(localStorage.getItem("user")); // retrieves the user data from local storage which is a
   const storedToken = localStorage.getItem("token");
   const [user, setUser] = useState(storedUser ? storedUser : null);
   const [token, setToken] = useState(storedToken ? storedToken : null);
   const [movies, setMovies] = useState([]);

   const handleUserDataUpdate = (updatedUserData) => {
      setUser(updatedUserData); // Update the state with the new user data
   };

   const handleUserUpdate = (updatedUser) => {
      // updates the user state with the new user data updatedUser is coming from the MovieView component
      setUser(updatedUser);
   };

   const onLoggedOut = () => {
      setUser(null);
      setToken(null);
      localStorage.clear();
      // Possibly navigate to a public page or the login page here as well
   };

   useEffect(() => {  // the purpose of this function is to fetch data from an API and update the movies state with the data,
      if (!token) {
         return; // if the token is falsy, return from the function
      }
      fetch("https://stix2you-myflix-5cbcd3c20372.herokuapp.com/movies", {   // fetches data from the API, GET request to the /movies endpoint
         headers: { Authorization: `Bearer ${token}` },
      })
         .then((response) => response.json()) // parses the JSON data from the response
         .then((movies) => {
            setMovies(movies); // updates the movies state with the data from the API
            const moviesFromApi = movies.map((doc) => {    // maps each element in the array to a new piece of UI

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
                  image: doc.ImagePath,
               };
            });
            setMovies(moviesFromApi);
         });
   }, [token]); // the second argument to useEffect is an array of dependencies, when the dependencies change, the effect is re-run
   // having token as a dependency ensures that the effect runs when the token changes

   return (
      <Container>
         <BrowserRouter>
            <NavigationBar
               user={user}
               onLoggedOut={() => {
                  setUser(null), setToken(null), localStorage.clear();
               }}
            />
            <Row className="justify-content-lg-center">
               <Routes>
                  <Route
                     path="/signup"
                     element={
                        <>
                           {user ? ( // if the user is logged in, navigate to the home page
                              <Navigate to="/" />
                           ) : (
                              <Col md={5}>
                                 <SignupView />
                              </Col>
                           )}
                        </> // navigate to the signup view if the user is not logged in
                     }
                  />
                  <Route
                     path="/login"
                     element={
                        <>
                           {user ? ( // if the user is logged in, navigate to the home page
                              <Navigate to="/" />
                           ) : (
                              <Col md={5}>
                                 <LoginView
                                    onLoggedIn={(user, token) => {
                                       setUser(user);
                                       setToken(token);
                                    }}
                                 />
                              </Col> // navigate to the login view if the user is not logged in
                           )}
                        </>
                     }
                  />

                  <Route
                     path="/movies/:moviesId"
                     element={
                        <>
                           {!user ? (
                              <Navigate to="/login" replace />
                           ) : movies.length > 0 ? (
                              <Col md={8}>
                                 <MovieView
                                    user={user}
                                    movies={movies}
                                    onUserUpdate={handleUserUpdate}
                                 />
                              </Col> // Navigate to individual movie-view if the user is logged in and movies are loaded
                           ) : (
                              <Col>
                                 <h2>Loading Movie Data...</h2>
                              </Col> // Show loading message while movies data is loading
                           )}
                        </>
                     }
                  />

                  <Route
                     path="/"
                     element={
                        <>
                           {!user ? (
                              <Navigate to="/login" replace />
                           ) : movies.length === 0 ? (
                              <Col>
                                 <h2>Loading Movie Data . . .</h2>
                              </Col>
                           ) : (
                              <>
                                 {movies.map((movie) => (
                                    <Col className="mb-4" key={movie.id} md={3}>
                                       <MovieCard
                                          user={user}
                                          movie={movie}
                                          onUserUpdate={handleUserUpdate}
                                       />
                                    </Col> // map over the movies and create a card for each one, MovieCard component renders the movie card
                                 ))}
                              </>
                           )}
                        </>
                     }
                  />

                  <Route
                     path="/users/:username"
                     element={
                        <>
                           {!user ? (
                              <Navigate to="/login" replace />
                           ) : Object.keys(user).length > 0 ? ( // Check if user object is not empty
                              <Col md={12}>
                                 <ProfileView
                                    movies={movies}
                                    user={user}
                                    onLoggedOut={onLoggedOut}
                                    onUserUpdate={handleUserDataUpdate}
                                 />
                              </Col>
                           ) : (
                              <Col>
                                 <h2>Loading User Data...</h2>
                              </Col> // Show loading message while user data is loading
                           )}
                        </>
                     }
                  />
               </Routes>
            </Row>
         </BrowserRouter>
      </Container>
   );
};

MainView.propTypes = {
   movies: PropTypes.arrayOf(
      PropTypes.shape({
         title: PropTypes.string.isRequired,
         releaseYear: PropTypes.string,
         rating: PropTypes.string,
         runtime: PropTypes.string,
         genres: PropTypes.array.isRequired,
         director: PropTypes.string.isRequired,
         actors: PropTypes.array.isRequired,
         description: PropTypes.string.isRequired,
         image: PropTypes.string.isRequired,
      })
   ),

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
   }).isRequired,
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
   },
};
