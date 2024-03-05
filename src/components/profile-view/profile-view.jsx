import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const ProfileView = ({ user, token }) => {
   const username = user.username;
   const [userData, setUserData] = useState(null);
   console.log("username: ", username);
   console.log("token: ", token);
   console.log("userData: ", userData);
   console.log("user: ", user);

   useEffect(() => {
      const fetchData = async () => {
         const url = `https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${encodeURIComponent(username)}`;

         try {
            const response = await fetch(url, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            console.log("API Response: ", data); // Log the response to inspect its structure

            if (data) {
               setUserData(data);
            } else {
               throw new Error('User data not found');
            }
         } catch (error) {
            console.error("Fetch error: ", error.message);
         }
      };
      fetchData();
   }, [username, token]); // Dependency array

   if (!userData) return <div>Loading...</div>;

   const birthday = new Date(user.birthday).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

   return (
      
      <Card className="m-4" style={{ borderRadius: "3%", overflow: 'hidden' }}>
         <Container>
            <Row>
               <Col>
                  <Card.Body>
                     <Card.Title className="mb-4" style={{ fontSize: '36px' }}>User Profile:</Card.Title>
                     <Card.Text>Username: {userData.username}</Card.Text>
                     <Card.Text>Email: {userData.email}</Card.Text>
                     <Card.Text>Birthday: {birthday}</Card.Text>
                     <Card.Text>Favorite Movies: {userData.favorite_movies.join(", ")}</Card.Text>
                     <Card.Text>User ID# {userData._id}</Card.Text>
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
