import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Card, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

function FavoriteMovies({ favoriteMovieList, localUser }) {
   const username = localUser.username;
   console.log("username", username);
   const removeFromFavorites = (title) => {   // Remove the movie from the user's favorites ... this function is being given the movie title as an argument
      axios.delete(`https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${localUser.username}/movies/${title}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
         }
      })
   }

   console.log("favoriteMovieList", favoriteMovieList);

   return (
      <Container>
         <Card className='m-4' style={{ borderRadius: '0%', overflow: 'hidden' }}>
            <Card.Body>
               <Card.Title className='mb-2' style={{ fontSize: '36px' }}>
                  Favorite Movies:
               </Card.Title>
               <Row>
                  {favoriteMovieList.map((movie) => (
                     <Col className="mb-4" key={movie.title} md={3}>
                        <Card style={{ cursor: "pointer" }} className="h-100">
                           <Card.Img variant="top" src={movie.image} style={{ width: "100%", overflow: 'hidden' }} />
                           <Card.Body>
                              <Card.Title>{movie.title}</Card.Title>
                              <Card.Text style={{ whiteSpace: 'pre' }}>{movie.releaseYear}        {movie.rating}</Card.Text>
                              <Card.Text>{movie.director}</Card.Text>
                              <Button onClick={() => removeFromFavorites(movie.title)}>Remove from Favorites</Button> 
                           </Card.Body>
                        </Card>
                     </Col> // map over the movies and create a card for each one, MovieCard component renders the movie card
                  ))}
               </Row>
            </Card.Body>
         </Card>
      </Container>
   );
};

export default FavoriteMovies;