import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";


export const MovieCard = ({ movie, onMovieClick }) => {
    return (                                               
        <Card className="h-100" onClick={() => onMovieClick(movie)}>             
            <Card.Img src={movie.image} style={{ width: "100%", overflow: 'hidden' }} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Button style={{ cursor: "pointer" }} onClick={() => onBookClick(book)} variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

// export const MovieCard = ({ movie, onMovieClick }) => {
//     return (                // The Card component is wrapped in a div with the class name "d-flex flex-row" in order to stack image b                                   
//         <Card style={{ width: '15rem' }} onClick={() => onMovieClick(movie)} className="d-flex flex-row">             
//             <Card.Img variant="top" src={movie.image} />
//             <Card.Body>
//                 <Card.Title>{movie.title}</Card.Title>
//                 <Card.Text>{movie.author}</Card.Text>
//                 <Button onClick={() => onMovieClick(movie)} variant="link">
//                     Open
//                 </Button>
//             </Card.Body>
//         </Card>
//     );
// };

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

