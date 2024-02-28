import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {    // create a functional component called MovieCard, which takes two props: movie and onMovieClick
    return (                           // returns a new piece of UI
        <div className="movie-card"           // style={{ textAlign: 'center' }}
            onClick={() => {           // when the div is clicked, it will call onMovieClick with the movie as an argument
                onMovieClick(movie);     // onMovieClick is a prop that's passed to the MovieCard component
            }}
        >
            <h2>{movie.title}</h2>         
        </div>                // returns the title of the movie
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

