import React from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {   // create a functional component called MovieView, which takes two props: movie and onBackClick
    return (
        <Card className="m-4" onClick={onBackClick} style={{ borderRadius: "3%", overflow: 'hidden' }}>
            <Container style={{ padding: 0 }}>
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
                            <Button className="back-button m-4 btn-lg" style={{ cursor: "pointer" }} onClick={e => { e.stopPropagation(); onBackClick(); }}>Back
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
};

MovieView.propTypes = {
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
    onBackClick: PropTypes.func.isRequired
};



// OLD RETURNED CODE:

// <div className="movie-list">
// <div className="movie-detail">
//     <div><img src={movie.image} /></div>
//     <div className="movie-details-list">
//     <h1>Title: {movie.title}</h1>
//     <h3 style={{whiteSpace: 'pre'}}> {movie.releaseYear}        {movie.rating}          {movie.runtime}</h3>
//     <h3>{movie.genres.join(" / ")}</h3>
//     <h3>{'\u00A0'}</h3>
//     <h2>Director: {movie.director}</h2>
//     <h2>Starring: {movie.actors.join(", ")}</h2>
//     <h4 style={{ maxWidth: '700px', margin: 'auto' }}>{movie.description}</h4>
//     <button onClick={onBackClick}>
//         Back
//     </button>
//     </div>
// </div>
// </div>