export const MovieCard = ({ movie, onMovieClick }) => {    // create a functional component called MovieCard, which takes two props: movie and onMovieClick
    return (                           // returns a new piece of UI
        <div style={{ textAlign: 'center' }}
            onClick={() => {           // when the div is clicked, it will call onMovieClick with the movie as an argument
                onMovieClick(movie);     // onMovieClick is a prop that's passed to the MovieCard component
            }}
        >
            <h2>{movie.title}</h2>            
        </div>                // returns the title of the movie
    );
};

