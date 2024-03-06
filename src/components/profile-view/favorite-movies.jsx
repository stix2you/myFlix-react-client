import React from 'react';
import { Link, Button } from 'react-bootstrap';

export const FavoriteMovies = ({ favoriteMovieList }) => {
   <>
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movie) => {
         return (
            < div key={movie._id} >
               <img src={movie.ImagePath} />
               <Link to={`/movies/${movies._id}`}>
                  <h4>{movie.Title}</h4>
               </Link>
               <Button variant="secondary" onClick={() => removeFav(movie._id)}>Remove from list</Button>
            </div >
         )
      })
      }
   </>
}