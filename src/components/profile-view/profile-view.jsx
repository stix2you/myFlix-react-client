import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";


export const ProfileView = ({ user, token, onUpdateUserData }) => {
   // const username = user.username;
   const userData = user;

   const [editMode, setEditMode] = useState({  // set the initial state of editMode to false
      username: false,
      password: false,
      email: false,
      birthday: false,
   });
   const [userValues, setUserValues] = useState({  // set the initial state of userValues to the user data
      username: userData.username,
      password: userData.password,
      email: userData.email,
      birthday: userData.birthday,
   });

   const birthday = new Date(user.birthday).toLocaleDateString('en-US', {  // 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
   });

   const handleEdit = (field) => {
      setEditMode({ ...editMode, [field]: true });
   };

   const handleChange = (field, value) => {
      setUserValues({ ...userValues, [field]: value });
   };

   const fetchUpdatedUserData = async () => {
      try {
         const response = await fetch(`https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${userValues.username}`, {
            method: 'GET',
            headers: {
               'Authorization': `Bearer ${token}`,
            },
         });
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }
         const updatedUserData = await response.json();
         setUserValues(updatedUserData);
         onUpdateUserData(updatedUserData);
         console.log('User information fetched and refreshed successfully!');
      } catch (error) {
         console.error("Error fetching the updated user information", error);
      }
   };

   const handleSave = async (field) => {
      try {
         const response = await fetch(`https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${userValues.username}`, {
            method: 'PUT', // Use PUT to update existing resource
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`, // Use your current token for authorization
            },
            body: JSON.stringify({
               username: userValues.username,
               password: userValues.password, // Make sure you're handling passwords securely
               email: userValues.email,
               birthday: userValues.birthday,
            }),
         });

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         } else {
            // If the save is successful, disable edit mode for this field
            setEditMode({ ...editMode, [field]: false });
            await fetchUpdatedUserData();   // Fetch the updated user data
            console.log('User information saved to API and refreshed successfully!');
         }
      } catch (error) {
         console.error("Error saving the updated information", error);
         // Handle error (e.g., show error message)
      }
   };

   return (
      <Card className="m-4" style={{ borderRadius: "3%", overflow: 'hidden' }}>
         <Container>
            <Row>
               <Col>
                  <Card.Body>
                     <Card.Title className="mb-4" style={{ fontSize: '36px' }}>User Profile:</Card.Title>
                     <Card.Text>User Name: {
                        editMode.username ?
                           (<input
                              type="username"
                              value={userValues.username}
                              onChange={(e) => handleChange('username', e.target.value)}
                           />)
                           : userData.username
                     }
                        {!editMode.username ? (
                           <Button onClick={() => handleEdit('username')}>Edit</Button>
                        ) : (
                           <Button onClick={() => handleSave('username')}>Save</Button>
                        )}
                     </Card.Text>
                     <Card.Text>Password: {
                        editMode.password ?
                           (<input
                              type="password"
                              value={""}
                              onChange={(e) => handleChange('password', e.target.value)}
                           />) : " ******** "

                     }
                        {!editMode.password ? (
                           <Button onClick={() => handleEdit('password')}>Edit</Button>
                        ) : (
                           <Button onClick={() => handleSave('password')}>Save</Button>
                        )}
                     </Card.Text>

                     <Card.Text>Email: {
                        editMode.email ?
                           (<input
                              type="email"
                              value={userValues.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                           />)
                           : userData.email
                     }
                        {!editMode.email ? (
                           <Button onClick={() => handleEdit('email')}>Edit</Button>
                        ) : (
                           <Button onClick={() => handleSave('email')}>Save</Button>
                        )}
                     </Card.Text>

                     <Card.Text>Birthday: {
                        editMode.birthday ?
                           (<input
                              type="date"
                              value={userValues.birthday}
                              onChange={(e) => handleChange('birthday', e.target.value)}
                           />)
                           : (new Date(userData.birthday)).toLocaleDateString()
                     }
                        {!editMode.birthday ? (
                           <Button onClick={() => handleEdit('birthday')}>Edit</Button>
                        ) : (
                           <Button onClick={() => handleSave('birthday')}>Save</Button>
                        )}
                     </Card.Text>

                     <Card.Text>Favorite Movies: {
                        editMode.favorite_movies ?
                           (<input
                              type="favorite_movies"
                              value={userValues.birthday}
                              onChange={(e) => handleChange('favorite_movies', e.target.value)}
                           />)
                           : userData.favorite_movies.join(", ")
                     }
                        {!editMode.favorite_movies ? (
                           <Button onClick={() => handleEdit('favorite_movies')}>Edit</Button>
                        ) : (
                           <Button onClick={() => handleSave('favorite_movies')}>Save</Button>
                        )}
                     </Card.Text>
                     <Link to={`/`}>
                        <Button className="back-button m-4 btn-lg" style={{ cursor: "pointer" }}>Back</Button>
                     </Link>
                  </Card.Body>
               </Col>
            </Row>
         </Container>
      </Card>
   );
};


// return (

//    <Card className="m-4" style={{ borderRadius: "3%", overflow: 'hidden' }}>
//       <Container>
//          <Row>
//             <Col>
//                <Card.Body>
//                   <Card.Title className="mb-4" style={{ fontSize: '36px' }}>User Profile:</Card.Title>
//                   <Card.Text>Username: {userData.username}</Card.Text>
//                   <Card.Text>Email: {userData.email}</Card.Text>
//                   <Card.Text>Birthday: {birthday}</Card.Text>
//                   <Card.Text>Favorite Movies: {userData.favorite_movies.join(", ")}</Card.Text>
//                   <Card.Text>User ID# {userData._id}</Card.Text>
//                   <Link to="/update-user" className="btn btn-primary">Update Profile</Link>
//                   <Link to={`/`}>
//                      <Button className="back-button m-4 btn-lg" style={{ cursor: "pointer" }}>Back</Button>
//                   </Link>
//                </Card.Body>
//             </Col>
//          </Row>
//       </Container>
//    </Card>
// );
// };
