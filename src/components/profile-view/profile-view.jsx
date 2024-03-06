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



export function ProfileView({ user, movies, onUpdatedUserInfo }) {
   const [userProfile, setUserProfile] = useState([]);



   // DISPLAY USER INFORMATION REQUIREMENT: fetch user data from API function here:
   async function fetchUser() {
      try {
         const username = user.username; // Make sure to replace this with actual logic to get the username
         const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
         const response = await axios.get(`https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
         });
         setUserProfile(response.data); // Set the user state with the fetched data
         console.log("user after fetch:", user)
         console.log("userProfile after fetch:", userProfile)
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
            `https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${user.username}`,
            {
               Username: user.Username,
               Password: user.Password,
               Email: user.Email,
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
   const favoriteMovieList = movies.filter((movie) => user.favorite_movies.includes(movie._id));

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
         <UserInfo name={user.username} email={user.email} />
         <FavoriteMovies favoriteMovieList={favoriteMovieList} />
         <UpdateUser user={user} handleUpdate={writeUser} />
      </>
   );
};

// return (
//    <Card className="m-4" style={{ borderRadius: "3%", overflow: 'hidden' }}>
//       <Container>
//          <Row>
//             <Col>
//                <Card.Body>
//                   <Card.Title className="mb-4" style={{ fontSize: '36px' }}>User Profile:</Card.Title>
//                   <Card.Text>User Name: {
//                      editMode.username ?
//                         (<input
//                            type="username"
//                            value={userValues.username}
//                            onChange={(e) => handleChange('username', e.target.value)}
//                         />)
//                         : userData.username
//                   }
//                      {!editMode.username ? (
//                         <Button onClick={() => handleEdit('username')}>Edit</Button>
//                      ) : (
//                         <Button onClick={() => handleSave('username')}>Save</Button>
//                      )}
//                   </Card.Text>
//                   <Card.Text>Password: {
//                      editMode.password ?
//                         (<input
//                            type="password"
//                            value={""}
//                            onChange={(e) => handleChange('password', e.target.value)}
//                         />) : " ******** "

//                   }
//                      {!editMode.password ? (
//                         <Button onClick={() => handleEdit('password')}>Edit</Button>
//                      ) : (
//                         <Button onClick={() => handleSave('password')}>Save</Button>
//                      )}
//                   </Card.Text>

//                   <Card.Text>Email: {
//                      editMode.email ?
//                         (<input
//                            type="email"
//                            value={userValues.email}
//                            onChange={(e) => handleChange('email', e.target.value)}
//                         />)
//                         : userData.email
//                   }
//                      {!editMode.email ? (
//                         <Button onClick={() => handleEdit('email')}>Edit</Button>
//                      ) : (
//                         <Button onClick={() => handleSave('email')}>Save</Button>
//                      )}
//                   </Card.Text>

//                   <Card.Text>Birthday: {
//                      editMode.birthday ?
//                         (<input
//                            type="date"
//                            value={userValues.birthday}
//                            onChange={(e) => handleChange('birthday', e.target.value)}
//                         />)
//                         : (new Date(userData.birthday)).toLocaleDateString()
//                   }
//                      {!editMode.birthday ? (
//                         <Button onClick={() => handleEdit('birthday')}>Edit</Button>
//                      ) : (
//                         <Button onClick={() => handleSave('birthday')}>Save</Button>
//                      )}
//                   </Card.Text>

//                   <Card.Text>Favorite Movies: {
//                      editMode.favorite_movies ?
//                         (<input
//                            type="favorite_movies"
//                            value={userValues.birthday}
//                            onChange={(e) => handleChange('favorite_movies', e.target.value)}
//                         />)
//                         : userData.favorite_movies.join(", ")
//                   }
//                      {!editMode.favorite_movies ? (
//                         <Button onClick={() => handleEdit('favorite_movies')}>Edit</Button>
//                      ) : (
//                         <Button onClick={() => handleSave('favorite_movies')}>Save</Button>
//                      )}
//                   </Card.Text>
//                   <Link to={`/`}>
//                      <Button className="back-button m-4 btn-lg" style={{ cursor: "pointer" }}>Back</Button>
//                   </Link>
//                </Card.Body>
//             </Col>
//          </Row>
//       </Container>
//    </Card>
// );
