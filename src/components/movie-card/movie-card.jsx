import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {           // onClick={() => onMovieClick(movie)} . . .  was removed from the Card tag
   return (
      <Card style={{ cursor: "pointer" }} className="h-100">
         <Card.Img variant="top" src={movie.image} style={{ width: "100%", overflow: 'hidden' }} />
         <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text style={{ whiteSpace: 'pre' }}>{movie.releaseYear}        {movie.rating}</Card.Text>
            <Card.Text>{movie.director}</Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
               <Button variant="link">Open</Button>
            </Link>
         </Card.Body>
      </Card>
   );
};

MovieCard.propTypes = {
   movie: PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      releaseYear: PropTypes.string,
      rating: PropTypes.string,
      director: PropTypes.string.isRequired,
   }).isRequired,
};

