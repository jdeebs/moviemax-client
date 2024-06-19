import React from "react";

export const UserInfo = ({ birthday, email, username }) => (
  <>
    <p>Username: <strong>{username}</strong></p>
    <p>Email: <strong>{email}</strong></p>
    <p>Birthday: <strong>{birthday}</strong></p>
  </>
);
