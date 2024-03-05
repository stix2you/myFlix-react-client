import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {   // receive the onLoggedIn prop from the MainView component, which contains
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Button clicked");

      const data = {
         username: username,
         password: password
      };
      console.log("data value", data);

      fetch("https://stix2you-myflix-5cbcd3c20372.herokuapp.com/login/", {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
      })
         .then((response) => response.json())
         .then((data) => {
            console.log("login response:", data);
            if (data.user) {
               localStorage.setItem("user", JSON.stringify(data.user));
               localStorage.setItem("token", data.token);
               onLoggedIn(data.user, data.token);
            } else {
               alert("No such user");
            }
         })
         .catch((e) => {
            alert("something went wrong ");
         });
   };

   return (
      <Form onSubmit={handleSubmit}>
         <h1>Login</h1>
         <Form.Group className="mb-2" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required />
         </Form.Group>
         <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required />
         </Form.Group>
         <Button className="mb-4" variant="primary" type="submit">
            Submit
         </Button>
      </Form>
   );
};
