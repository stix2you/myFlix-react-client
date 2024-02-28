import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {   // create a functional component called MovieView, which takes two props: movie and onBackClick
    return (                                             // returns a new piece of UI
        <div>
            <div style={{ textAlign: 'center' }}>
                <img src={movie.image} />
                <h1>Title: {movie.title}</h1>
                <h3>Release Year: {movie.releaseYear}, Rated: {movie.rating}, Runtime: {movie.runtime}</h3>
                <h3>Genres: {movie.genres}</h3>
                <h2>Director: {movie.director}</h2>
                <h2>Starring: {movie.actors}</h2>
                <h4 style={{ maxWidth: '700px', margin: 'auto' }}>{movie.description}</h4>
                <h4>    </h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button                                  // when the button is clicked, it will call onBackClick
                    onClick={onBackClick}
                    style={{
                        width: '100px',  
                        height: '50px',  
                        fontSize: '30px'  
                    }}
                >
                    Back
                </button>
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
        director: PropTypes.array.isRequired,
        actors: PropTypes.array.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,                          
    onBackClick: PropTypes.func.isRequired  
};

MovieView.defaultProps = {               
    movie: {
        title: "Title",
        releaseYear: "Release Year",
        rating: "Rating",
        runtime: "Runtime",
        genres: "Genres",
        director: "Director",
        actors: "Actors",
        description: "Description",
        image: "Image",
    }
};