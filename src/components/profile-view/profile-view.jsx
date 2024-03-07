import React from "react";
import React, { useState, useEffect } from "react";
import UserInfo from "./user-info";
import UpdateUser from "./update-user";
import FavoriteMovies from "./favorite-movies";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";

export function ProfileView({
   user: initialUser,
   movies,
   onLoggedOut,
   onUserUpdate,
}) {
   const [localUser, setLocalUser] = useState(initialUser); // Set the local user state with the initial user data

   async function fetchUser() {
      try {
         const response = await axios.get(
            `https://stix2you-myflix-5cbcd3c20372.herokuapp.com/users/${localUser.username}`,
            {
               headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
         );
         const updatedUser = response.data;
         setLocalUser(updatedUser); // Update local user state with data retuned confirming post operation
         onUserUpdate(updatedUser); // Update the user state in MainView with data returned confirming post operation
         console.log("localUser after fetch:", localUser);
      } catch (error) {
         console.error("Failed to fetch user:", error);
      }
   }

   const favoriteMovieList = movies.filter((movie) =>
      localUser.favorite_movies.includes(movie.title)
   );

   useEffect(() => {      // useEffect to run when the component mounts
      let isMounted = true;
      isMounted && fetchUser();
      return () => {
         isMounted = false;
      };
   }, []);

   return (
      <Container>
         <Row>
            <Col md={4}>
               <UserInfo
                  user={initialUser}
                  name={localUser.username}
                  email={localUser.email}
                  birthday={localUser.birthday}
               />
            </Col>

            <Col md={8}>
               <UpdateUser
                  localUser={initialUser}
                  onUserUpdate={onUserUpdate}
                  onLoggedOut={onLoggedOut}
               />
            </Col>
         </Row>
         <Row>
            <FavoriteMovies
               localUser={initialUser}
               favoriteMovieList={favoriteMovieList}
            />
         </Row>
      </Container>
   );
}
