import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Assuming `user` and `token` are passed as props for authentication and initial data
export const UpdateUser = ({ user, token, onUpdateSuccess }) => {
   // set the CURRENT user information as the initial state, except for the password
   const [username, setUsername] = useState(user.username);
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState(user.email);
   const [birthday, setBirthday] = useState(user.birthday);

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const response = await fetch(`https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${user.username}`, {
               headers: {
                  'Authorization': `Bearer ${token}`,
               },
            });

            if (!response.ok) {
               throw new Error('Network response was not ok.');
            }

            const userData = await response.json();
            setUsername(userData.username);
            setEmail(userData.email);
            setBirthday(userData.birthday);
         } catch (error) {
            console.error("An error occurred while fetching user data:", error);
            alert("Failed to fetch user data.");
         }
      };

      fetchUserData();
   }, [user.username, token]);

   console.log("information parked in the state variables:", username, password, email, birthday);


   const handleInputChange = (event) => {
      const { name, value } = event.target;
      switch (name) {
         case "username":
            setUsername(value);
            break;
         case "password":
            setPassword(value);
            break;
         case "email":
            setEmail(value);
            break;
         case "birthday":
            setBirthday(value);
            break;
         default:
            break;
      }
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      // Construct the data object based on state, excluding password if it's not provided
      let dataToUpdate = {
         ...(username && { username }),
         ...(password && { password: await bcrypt.hash(password, 10) }),
         ...(email && { email }),
         ...(birthday && { birthday }),
      };

      // Convert the birthday to the desired format
      if (birthday) {
         const formattedBirthday = new Date(birthday).toISOString().split('T')[0];
         dataToUpdate = { ...dataToUpdate, birthday: formattedBirthday };
      }

      console.log("dataToUpdate:", dataToUpdate);
      try {
         const response = await fetch(`https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${user.username}`, {
            method: 'PUT', // Method type for updating information
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`, // Ensure this is how your API expects the token
            },
            body: JSON.stringify(dataToUpdate),
         });

         if (!response.ok) {
            throw new Error('Network response was not ok.');
         }

         const updatedUser = await response.json();
         alert("User information updated successfully!");
         onUpdateSuccess(updatedUser); // Assuming you want to pass the updated user info back
      } catch (error) {
         console.error("An error occurred during the update:", error);
         alert("Failed to update user information.");
      }
      console.log("Sending update request with data:", dataToUpdate);

      // Simulate API call success and call onUpdateSuccess
      setTimeout(() => {
         alert("User information updated successfully!");
         onUpdateSuccess(); // Callback function to handle post-update actions
      }, 1000);
      console.log("confirmed user update", user)
   };

   return (
      <Form>
         <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
               type="text"
               name="username"
               placeholder="Enter username"
               value={username}
               onChange={handleInputChange}
            />
         </Form.Group>

         <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
               type="password"
               name="password"
               placeholder="New password (leave blank to keep current)"
               value={password}
               onChange={handleInputChange}
            />
         </Form.Group>

         <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
               type="email"
               name="email"
               placeholder="Enter email"
               value={email}
               onChange={handleInputChange}
            />
         </Form.Group>

         <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
               type="date"
               name="birthday"
               value={birthday}
               onChange={handleInputChange}
            />
         </Form.Group>

         <Button variant="primary" type="submit" onClick={handleSubmit}>
            Update
         </Button>
      </Form>
   );
};
