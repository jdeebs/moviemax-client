import React from "react";

export const UserInfo = ({ birthday, email, username }) => (
  <>
    <p>Username: {username}</p>
    <p>Email: {email}</p>
    <p>Birthday: {birthday}</p>
  </>
);
