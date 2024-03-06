// Structure: profile-view.jsx will have the functions and control mechanicms as a Parent element
// Child elements will be display portion, the form and the favorite movies list

import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './profile-view.scss';
import UserInfo from './user-info';
import UpdateUser from './update-user';
import FavoriteMovies from './favorite-movies';



export function ProfileView({ movies, onUpdatedUserInfo }) {

   const [user, setUser] = useState({});  // set the initial state of user to an empty object

   const favoriteMovieList = movies.filter((movies) => { }); // filter the movies array to only include the movies that are in the user's favorite_movies array

   const getUser = () => { };  // function to get the user data from the API

   const handleSubmit = (e) => { };  // function to submit the form

   const removeFav = (id) => { };  // function to remove a movie from the user's favorite_movies array

   const handleUpdate = (e) => { };  // function to update the user data

   useEffect(() => { }, []);  // useEffect to run when the component mounts



   return (
      <>
         <UserInfo name={user.Username} email={user.Email} />
         <FavoriteMovies favoriteMovieList={favoriteMovieList} />
         <UpdateUser user={user} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
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
