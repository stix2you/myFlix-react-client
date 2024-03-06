import React from 'react';
import { Form, Button } from 'react-bootstrap';

function UpdateUser ({ user, handleSubmit, handleUpdate }) {
   return (
      <>
         <Form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
            <h2>Update User Info</h2>
            <label>Your Username:</label>
            <input type="text" name='Username' defaultValue={user.Username} onChange={(e) => handleUpdate(e)} />
            <label>Your Password</label>
            <input type="password" name='Password' defaultValue={user.Password} onChange={(e) => handleUpdate(e)} />
            <label>Your Email:</label>
            <input type="email" name='Email' defaultValue={user.Email} onChange={(e) => handleUpdate(e)} />
            {/* <label>Birthday:</label>
         <input type="date" name='Birthday' defaultValue={user.Birthday} onChange={(e) => handleUpdate(e)} /> */}
            <Button variant="primary" type="submit">Update</Button>
         </Form>
      </>
   );
};

export default UpdateUser;