import React from 'react';

function UserInfo  ({ name, email }) {
   return (
   <>
      <p>Your Username: {name}</p>
      <p>Your Email: {email}</p>
   </>
   );
};

export default UserInfo;