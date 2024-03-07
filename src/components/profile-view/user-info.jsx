import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

function UserInfo({ user }) {
   console.log("birthday:", user.birthday)

   return (
      <>
         <Card className="m-4" style={{ borderRadius: "3%", overflow: 'hidden' }}>
            <Container>
               <Row>
                  <Col>
                     <Card.Body>
                        <Card.Title className="mb-4" style={{ fontSize: '36px' }}>User Profile:</Card.Title>
                        <Card.Text>Username: {user.username}
                        </Card.Text>
                        <Card.Text>Email: {user.email}
                        </Card.Text>
                        <Card.Text>
                           Birthday: {
                              new Date(new Date(user.birthday).getTime() + (24 * 60 * 60 * 1000)) // Adds one day for display purposes only, 
                                                                                                // user.birthday remains unchanged
                                 .toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                 })
                           }
                        </Card.Text>
                     </Card.Body>
                  </Col>
               </Row>
            </Container>
         </Card>
      </>
   );
};

export default UserInfo;