import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FavoriteMovies  ({ favoriteMovieList }) {
   const removeFav = (id) => {
      let token = localStorage.getItem('token');
      let url = `https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`;
      axios.delete(url, {
         headers: { Authorization: `Bearer ${token}` },
      })
         // .then((response) => {  
         //    console.log(response);
         //    getUser();   //
         // })
         // .catch((e) => {
         //    console.log(e);
         // });
   }

   return (
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
   );
};

export default FavoriteMovies;