import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

function UpdateUser({ localUser: initialUser, handleSubmit, handleUpdate }) {
   const [localUser, setLocalUser] = useState(initialUser);                // Set the local user state with the initial user data
   console.log("localUser in UpdateUser: ", localUser);

   return (
      <>
         <Card className="m-4" style={{ borderRadius: "3%", overflow: 'hidden' }}>
            <Container>
               <Row>
                  <Col>
                     <Card.Body>
                        <Card.Title className="mb-4" style={{ fontSize: '36px' }}>Update Your Information:</Card.Title>
                        <Card.Text>User Name: <input type="text" name='Username' defaultValue={localUser.username} />
                        </Card.Text>
                        <Card.Text>Password: <input type="password" name='Password' />
                        </Card.Text>
                        <Card.Text>Email: <input type="email" name='Email' defaultValue={localUser.Email}  />   
                        </Card.Text>
                        <Card.Text>Birthday: <input type="date" name='Birthday' defaultValue={localUser.birthday}  />
                        </Card.Text>
                        <Button onClick={() => handleSubmit()}>Submit Changes</Button>
                        <Link to={`/`}>
                           <Button className="back-button m-4 btn-lg" style={{ cursor: "pointer" }}>Back</Button>
                        </Link>
                     </Card.Body>
                  </Col>
               </Row>
            </Container>
         </Card>
      </>
     
   );
};

export default UpdateUser;


// onChange={(e) => handleUpdate(e)}  was removed from the input tags