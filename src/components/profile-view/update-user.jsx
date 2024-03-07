import React from 'react'
import React, { useState } from 'react'
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateUser = ({ localUser: user, onUserUpdate, onLoggedOut }) => {
   const [username, setUsername] = useState(user.username)
   const [password, setPassword] = useState('') // password field cannot be pre-filled, nor do we have access to the user's password
   const [email, setEmail] = useState(user.email)
   const [birthday, setBirthday] = useState(user.birthday)
   const navigate = useNavigate() // Use useNavigate hook for React Router v6

   const handleSubmitChanges = async e => {
      e.preventDefault() // Prevent the default form submit action

      const updatedUserData = {
         username,
         password, // Include password only if it's been changed; consider omitting if empty
         email,
         birthday
      }

      try {
         // Make an API call to update the user data
         const response = await axios.put(
            `https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${user.username}`,
            updatedUserData,
            {
               headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
         )

         // If the API call is successful, use the onUserUpdate callback to update the parent component
         onUserUpdate(response.data)
         alert('User information updated successfully.')
      } catch (error) {
         console.error('Error updating user information:', error)
         alert('Failed to update user information.')
      }
   }

   const formatDateForInput = isoDateString => {
      return isoDateString.split('T')[0] // This splits the ISO string at 'T' and returns the date part
   }

   const handleDeleteAccount = async () => {
      const confirmDelete = window.confirm(
         'Are you sure you want to delete your account? This action cannot be undone.'
      )
      if (confirmDelete) {
         try {
            const response = await axios.delete(
               `https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${username}`,
               {
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
               }
            )
            if (response.status === 200) {
               alert('Account successfully deleted.')
               onLoggedOut()
               navigate('/login')
            }
         } catch (error) {
            console.error('Error deleting account:', error)
            alert('Failed to delete account. Please try again.')
         }
      }
   }

   return (
      <Card className='m-4' style={{ borderRadius: '3%', overflow: 'hidden' }}>
         <Card.Body>
            <Card.Title className='mb-4' style={{ fontSize: '36px' }}>
               Update Your Information:
            </Card.Title>
            <Form onSubmit={handleSubmitChanges}>
            <Container>
               
                  <Row>
                     <Col>
                        <Form.Group controlId='formUsername'>
                           <Form.Label>Username:</Form.Label>
                           <Form.Control
                              type='text'
                              value={username}
                              onChange={e => setUsername(e.target.value)}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId='formPassword'>
                           <Form.Label>
                              Password (leave blank if no change):
                           </Form.Label>
                           <Form.Control
                              type='password'
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <Form.Group controlId='formEmail'>
                           <Form.Label>Email:</Form.Label>
                           <Form.Control
                              type='email'
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId='formBirthday'>
                           <Form.Label>Birthday:</Form.Label>
                           <Form.Control
                              type='date'
                              value={formatDateForInput(birthday)}
                              onChange={e => setBirthday(e.target.value)}
                           />
                        </Form.Group>
                     </Col>
                  </Row>
            </Container>

               <Button className='m-4 btn-lg' variant='primary' type='submit'>
               Submit Changes
            </Button>
            <Button
               className='m-4 btn-lg'
               variant='danger'
               onClick={handleDeleteAccount}
            >
               Delete Account
            </Button>
            <Link to={`/`}>
               <Button
                  className='back-button m-4 btn-lg'
                  style={{ cursor: 'pointer' }}
               >
                  Back
               </Button>
            </Link>
         </Form>
      </Card.Body>
      </Card >
   )
}

export default UpdateUser
