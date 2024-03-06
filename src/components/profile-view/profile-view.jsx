// Structure: profile-view.jsx will have the functions and control mechanicms as a Parent element
// Child elements will be display portion, the form and the favorite movies list

import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './profile-view.scss';
import UserInfo from './user-info';
import UpdateUser from './update-user';
import FavoriteMovies from './favorite-movies';
import axios from 'axios';



export function ProfileView({ user: initialUser, movies, onUserUpdate }) {
   const [localUser, setLocalUser] = useState(initialUser);                // Set the local user state with the initial user data



   // DISPLAY USER INFORMATION REQUIREMENT: fetch user data from API function 
   async function fetchUser() {
      try {
         const response = await axios.get(`https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${localUser.username}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
         });
         const updatedUser = response.data;
         setLocalUser(updatedUser);  // Update local user state with data retuned confirming post operation
         onUserUpdate(updatedUser);  // Update the user state in MainView with data returned confirming post operation

         console.log("localUser after fetch:", localUser)
         
      } catch (error) {
         console.error("Failed to fetch user:", error);
         // Handle error appropriately
      }
   };

   // UPDATE USER INFORMATION REQUIREMENT: write user data to API functions here, one for submitting the form, and one for updating the form
   async function writeUser() {
      // e.preventDefault();  // Prevent the default refresh of the page
      try {
         await axios.put(
            `https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${localUser.username}`,
            {
               Username: localUser.Username,
               Password: localUser.Password,
               Email: localUser.Email,
            },
            {
               headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
         );
         getUser();
         onUpdatedUserInfo();
      } catch (error) {
         console.log(error);
      }
   };

   // ALLOW USER TO DEREGISTER REQUIREMENT: delete user from API function here:
   const handleDeregister = async (e) => { };

   // DISPLAY FAVORITE MOVIES REQUIREMENT: filter the movies array to only include the movies that are in the user's favorite_movies array
   const favoriteMovieList = movies.filter((movie) => localUser.favorite_movies.includes(movie._id));

   // REMOVE FAVORITE MOVIE REQUIREMENT: function to remove a movie from the user's favorite_movies array
   const removeFav = (id) => { };  // function to remove a movie from the user's favorite_movies array

   // ADD A FAVORITE MOVIE REQUIREMENT: function to add a movie to the user's favorite_movies array -- SEE MOVIE-VIEW.JSX and MOVIE-CARD.JSX

   useEffect(() => {      // useEffect to run when the component mounts
      let isMounted = true;
      isMounted && fetchUser();
      return () => {
         isMounted = false;
      }
   }, []);   // Empty dependency array means this effect runs once on component mount



   return (
      <>
         <UserInfo name={localUser.username} email={localUser.email} birthday={localUser.birthday} handleDeregister={handleDeregister} />
         <UpdateUser localUser={localUser} handleUpdate={writeUser} />
         <FavoriteMovies favoriteMovieList={favoriteMovieList} />
      </>
   );
};
