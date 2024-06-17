import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { ProfileUpdate } from "./profile-update";
import { useNavigate } from "react-router-dom";

export const ProfileView = ({ username, token }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://movie-max-f53b34b56a95.herokuapp.com/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, token]);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);

    // Update the URL with the updated username upon refresh
    navigate(`/users/${updatedUser.Username}`, { replace: true });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Col md={8} className="profile-view">
      <h1>Profile Info</h1>
      {user && (
        <UserInfo
          username={user.Username}
          email={user.Email}
          birthday={formatDate(user.Birthday)}
        />
      )}
      <ProfileUpdate
        username={username}
        token={token}
        user={user}
        onProfileUpdate={handleUpdate}
      />
    </Col>
  );
};

// Format birthday date to look more user friendly
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toDateString(undefined, options);
};
