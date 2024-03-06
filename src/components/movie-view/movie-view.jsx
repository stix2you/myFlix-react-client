import React from 'react';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useState } from 'react';


export const MovieView = ({ user:initialUser, movies, onUserUpdate }) => {
   const { moviesId } = useParams();     // set moviesId to the value of the parameter in the URL (movie_id)
   const movie = movies.find((m) => m.id === moviesId);   // find the movie with the same id as the parameter in the URL

   const [localUser, setLocalUser] = useState(initialUser);

   // Function to check if the movie is already in the favorites
   const isFavorite = (movieTitle) => localUser.favorite_movies.includes(movieTitle);

   // Function to handle adding the movie to favorites
   const addToFavorites = async () => {
      if (!isFavorite(movie.title)) {
         
         try {
            const response = await axios.post(
               `https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${localUser.username}/movies/${movie.title}`,
               {},
               { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );

            const updatedUser = response.data; 
            setLocalUser(updatedUser);  // Update local user state with data retuned confirming post operation
            onUserUpdate(updatedUser);  // Update the user state in MainView with data returned confirming post operation
            alert("Movie added to favorites!");

         } catch (error) {
            console.error("Error adding movie to favorites:", error);
         }
      }
   };

   return (
      <Card className="m-4" style={{ borderRadius: "3%", overflow: 'hidden' }}>
         <Container style={{ padding: 0 }}>
            <Row gutters="false">
               <Col style={{ overflow: 'hidden', borderRadius: '3% 0 0 3%' }}>
                  <Card.Img variant="top" src={movie.image} style={{ width: "100%" }} />
               </Col>
               <Col>
                  <Card.Body>
                     <Card.Title>{movie.title}</Card.Title>
                     <Card.Text style={{ whiteSpace: 'pre' }}>{movie.releaseYear}        {movie.rating}          {movie.runtime}</Card.Text>
                     <Card.Text>{movie.genres.join(" / ")}</Card.Text>
                     <Card.Text>Director: {movie.director}</Card.Text>
                     <Card.Text>Starring: {movie.actors.join(", ")}</Card.Text>
                     <Card.Text style={{ maxWidth: '700px', margin: 'auto' }}>{movie.description}</Card.Text>
                     <Link to={`/`}>
                        <Button className="back-button m-4 btn-lg" style={{ cursor: "pointer" }}>Back</Button>
                     </Link>
                     <Button onClick={addToFavorites}>{isFavorite(movie.title) ? "Already in Favorites" : "Add to Favorites"}</Button>
                  </Card.Body>
               </Col>
            </Row>
         </Container>
      </Card>
   );
};
