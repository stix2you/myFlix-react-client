import React from 'react';
import { Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

// Define the filterMovies function inside the DisplayMovies component or as a separate utility function
const filterMovies = (movies, query) => {
  if (!query) {
    return movies;
  }
  return movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()));
};

export const DisplayMovies = ({ movies, user, searchQuery, onUserUpdate }) => {
  // Use the filterMovies function to get either all movies or the filtered list based on the searchQuery
  const filteredMovies = filterMovies(movies, searchQuery);

  // Conditional rendering based on the length of the filteredMovies array
  if (filteredMovies.length === 0) {
    return <Col>Sorry, no results match your search criteria.</Col>;
  }

  return (
    <>
      {filteredMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} md={3}>
          <MovieCard user={user} movie={movie} onUserUpdate={onUserUpdate} />
        </Col>
      ))}
    </>
  );
};
