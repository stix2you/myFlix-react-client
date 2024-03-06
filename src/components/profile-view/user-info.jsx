import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function UserInfo({ name, email, birthday }) {
   return (
      <>
         <Card className="m-4" style={{ borderRadius: "3%", overflow: 'hidden' }}>
            <Container>
               <Row>
                  <Col>
                     <Card.Body>
                        <Card.Title className="mb-4" style={{ fontSize: '36px' }}>User Profile:</Card.Title>
                        <Card.Text>Username: {name}
                        </Card.Text>
                        <Card.Text>Email: {email}
                        </Card.Text>
                        <Card.Text>Birthday: {
                           new Date(birthday).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                           })}
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