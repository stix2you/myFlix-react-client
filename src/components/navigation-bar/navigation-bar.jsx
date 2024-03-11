import { useState } from "react";
import { Navbar, Container, Nav, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
   const [searchTerm, setSearchTerm] = useState('');

   const handleSearchChange = (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      onSearchChange(term); // Pass the search term to the parent component
   };

   return (
      <Navbar bg="primary" data-bs-theme="dark" className="custom-navbar rounded-3 mb-4" sticky="top" expand="lg">
         <Container>
            <Navbar.Brand as={Link} to="/">
               MyFlix App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="mr-auto">
                  {!user && (
                     <>
                        <Nav.Link as={Link} to="/login">
                           Login
                        </Nav.Link>
                        <Nav.Link as={Link} to="/signup">
                           Signup
                        </Nav.Link>
                     </>
                  )}
                  {user && (
                     <>
                        <Nav.Link as={Link} to="/">
                           Home
                        </Nav.Link>
                     </>
                  )}
                  {user && (
                     <>
                        <Nav.Link as={Link} to={`/users/${encodeURIComponent(user.username)}`}>
                           Profile
                        </Nav.Link>
                        <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                     </>
                  )}
                  {user && (
                     <>
                        <Form inline className="ml-auto">
                           <FormControl
                              type="text"
                              placeholder="Search movies"
                              className="mr-sm-2"
                              onChange={(e) => onSearch(e.target.value)}
                           />
                        </Form>
                     </>
                  )}
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};
