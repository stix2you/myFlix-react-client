import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {   // create a functional component called MovieView, which takes two props: movie and onBackClick
    return (
        <div className="movie-list">
            <div className="movie-detail">
                <div><img src={movie.image} /></div>
                <div className="movie-details-list">
                <h1>Title: {movie.title}</h1>
                <h3 style={{whiteSpace: 'pre'}}> {movie.releaseYear}        {movie.rating}          {movie.runtime}</h3>
                <h3>{movie.genres.join(" / ")}</h3>
                <h3>{'\u00A0'}</h3>
                <h2>Director: {movie.director}</h2>
                <h2>Starring: {movie.actors.join(", ")}</h2>
                <h4 style={{ maxWidth: '700px', margin: 'auto' }}>{movie.description}</h4>
                <button onClick={onBackClick}>
                    Back
                </button>
                </div>
            </div>
        </div>
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
