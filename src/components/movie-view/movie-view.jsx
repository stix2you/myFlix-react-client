import React from 'react';
import { useParams } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';


export const MovieView = ({ movies }) => {   
   console.log("MovieView.jsx was called");    // this logs to the console the the component was called, this happens okay
   console.log("movies state passed to MovieView", movies);   // I see in the console where there is a full array, all the data is passed okay
   const { moviesId } = useParams();   // this is SUPPOSED to set the ID in the URL to the moviesId variable, the ID is in the URL, but it's not being set to moviesId
   console.log("moviesId at start of MovieView", moviesId);   // confirmed here -- moviesId is undefined
   const movie = movies.find((m) => m.id === moviesId);   

   


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
                  </Card.Body>
               </Col>
            </Row>
         </Container>
      </Card>
   );
};
