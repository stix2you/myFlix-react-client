import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const ProfileView = ({ user, token }) => {
   const username = user.username;
   const userData = user;
   console.log("username: ", username);
   console.log("token: ", token);
   console.log("userData: ", userData);
   console.log("user: ", user);

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
