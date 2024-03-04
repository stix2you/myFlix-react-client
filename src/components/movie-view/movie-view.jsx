import React from 'react';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export const MovieView = ({ movies }) => {   // create a functional component called MovieView, which takes one prop: movie
   const { movieId } = useParams();   // get the movie ID from the URL, useParams() is a hook 
                                     // from react-router-dom which allows access to the parameters of the current <Route>
   const movie = movies.find((m) => m.id === movieId);   // find the movie with the ID passed in the URL

   return (
      <Card className="m-4" style={{ borderRadius: "3%", overflow: 'hidden' }}>
         {/* <Container style={{ padding: 0 }}>
            <Row noGutters>
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
                  </Card.Body>
               </Col>
            </Row>
         </Container> */}
      </Card>
   );
};
