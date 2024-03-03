import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";


export const MovieCard = ({ movie, onMovieClick }) => {
    return (                                               
        <Card style={{ cursor: "pointer" }} className="h-100" onClick={() => onMovieClick(movie)} >             
            <Card.Img src={movie.image} style={{ width: "100%", overflow: 'hidden' }} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        releaseYear: PropTypes.string,
        rating: PropTypes.string,
        runtime: PropTypes.string,
        genres: PropTypes.array.isRequired,
        director: PropTypes.string.isRequired,
        actors: PropTypes.array.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };

