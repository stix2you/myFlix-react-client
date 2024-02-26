// This version of main-view.jsx uses the default export method to export the MainView component.
// This means that when you import the component, you don't need to destructure it from the module.
// Import the MainView component WITHOUT curly braces:  import MainView from './path/to/main-view';
// This MUST BE CHANGED in the index.jsx file to use this method

import { useState } from "react";                   // import the useState hook from the react package
import { MovieCard } from "../movie-card/movie-card";  // import the MovieCard component from the movie-card module
import { MovieView } from "../movie-view/movie-view";  // import the MovieView component from the movie-view module  

const MainView = () => {              // create a functional component called MainView
    const [movies, setMovies] = useState([     // create a new piece of state called movies, and a function called setMovies to update it
        {
            id: 1,
            title: "The Shawshank Redemption",
            releaseYear: "1994",
            rating: "R",
            runtime: "2h 22m",
            description: "The Shawshank Redemption is a 1994 American prison drama film written and directed by Frank Darabont, based on the 1982 Stephen King novella Rita Hayworth and Shawshank Redemption. The film tells the story of banker Andy Dufresne (Tim Robbins), who is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover, despite his claims of innocence. Over the following two decades, he befriends a fellow prisoner, contraband smuggler Ellis Redding (Morgan Freeman), and becomes instrumental in a money laundering operation led by the prison warden Samuel Norton (Bob Gunton). William Sadler, Clancy Brown, Gil Bellows, and James Whitmore appear in supporting roles.",
            genres: [
                "Drama   "
            ],
            director: "Frank Darabont   ",
            actors: [
                "Tim Robbins   ",
                "Morgran Freeman   ",
                "Bob Gunton   ",
            ],
            image: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"
        },
        {
            id: 2,
            title: "Seven Samurai",
            releaseYear: "1954",
            rating: "Not Rated",
            runtime: "3h 27m",
            description: "Seven Samurai is a 1954 Japanese epic samurai film co-written, edited, and directed by Akira Kurosawa. Taking place in 1586 in the Sengoku period of Japanese history, it follows the story of a village of desperate farmers who seek to hire masterless samurai to combat bandits who will return after the harvest to steal their crops.",
            genres: [
                "Action   ",
                "Drama   "
            ],
            director: "Akira Kurosawa",
            actors: [
                "Toshiro Mifune   ",
                "Takashi Shimura   ",
                "Keiko Tsushima   "
            ],
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Seven_Samurai_poster.jpg/330px-Seven_Samurai_poster.jpg"
        },
        {
            id: 3,
            title: "Interstellar",
            releaseYear: "2014",
            rating: "PG-13",
            runtime: "2h 48m",
            description: "Interstellar is a 2014 epic science fiction film co-written, directed, and produced by Christopher Nolan. It stars Matthew McConaughey, Anne Hathaway, Jessica Chastain, Bill Irwin, Ellen Burstyn, Michael Caine, and Matt Damon. Set in a dystopian future where humanity is embroiled in a catastrophic blight and famine, the film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for humankind.",
            genres: [
                "Adventure   ",
                "Drama   ",
                "SciFi   "
            ],
            director: "Christopher Nolan",
            actors: [
                "Matthew McConaughey   ",
                "Anne Hathaway   ",
                "Jessica Chastain   "
            ],
            image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
        },
        {
            id: 4,
            title: "The Godfather Part II",
            releaseYear: "1974",
            rating: "R",
            runtime: "3h 22m",
            description: "The Godfather Part II is a 1974 American epic crime film. The film is produced and directed by Francis Ford Coppola, loosely based on the 1969 novel The Godfather by Mario Puzo. The film is both a sequel and a prequel to The Godfather, presenting parallel dramas: one picks up the 1958 story of Michael Corleone (Al Pacino), the new Don of the Corleone crime family, protecting the family business in the aftermath of an attempt on his life; the prequel covers the journey of his father, Vito Corleone (Robert De Niro), from his Sicilian childhood to the founding of his family enterprise in New York City.",
            genres: [
                "Crime   ",
                "Drama   "
            ],
            director: "Francis Ford Coppola",
            actors: [
                "Al Pacino   ",
                "Robert De Niro   ",
                "Robert Duvall   "
            ],
            image: "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg"
        },
        {
            id: 5,
            title: "Saving Private Ryan",
            releaseYear: "1998",
            rating: "R",
            runtime: "2h 49m",
            description: "Tom Hanks plays a bad ass history teacher in this movie.",
            genres: [
                "Drama   ",
                "War   "
            ],
            director: "Steven Spielberg",
            actors: [
                "Tom Hanks   ",
                "Edward Burns   ",
                "Matt Damon   "
            ],
            image: "https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);   // create a new piece of state called selectedMovie, and a function called setSelectedMovie to update it

    if (selectedMovie) {                             // if selectedMovie is truthy, return a new MovieView component
        return (                                    // returns a new MovieView component with the selectedMovie as a prop
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />  // onBackClick is a prop that's passed to the MovieView component
        );
    }

    if (movies.length === 0) {                       // if the length of the movies array is 0, return a message
        return <div>The list is empty!</div>;       // returns a message that says "The list is empty!"
    }

    return (                         // returns a new piece of UI
        <div>
            {movies.map((movie) => (   // maps each element in the array to a new piece of UI, after execution will have <div>{movie.title}</div> for each movie in the array
                <MovieCard            // returns a new MovieCard component for each movie in the array
                    key={movie.id}    // key is a special attribute that's used by React to keep track of the elements in the array -- it should be unique for each element
                    movie={movie}      // movie is a prop that's passed to the MovieCard component
                    onMovieClick={(newSelectedMovie) => {       // onMovieClick is a prop that's passed to the MovieCard component
                        setSelectedMovie(newSelectedMovie);     // when the MovieCard component calls onMovieClick, it will call setSelectedMovie with the newSelectedMovie as an argument (newSelectedMovie is the movie that was clicked on
                    }} />
            ))}
        </div>
    );

};

export default MainView;   // export the MainView component as the default export