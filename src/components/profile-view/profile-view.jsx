import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const ProfileView = ({ username, token }) => {
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const userData = response.data;
        setEmail(userData.Email);
        setBirthday(formatDate(userData.Birthday));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username, token]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
      <div>
        <strong>Username:</strong> {username}
      </div>
      <div>
        <strong>Email:</strong> {email}
      </div>
      <div>
        <strong>Birthday:</strong> {birthday}
      </div>
    </Col>
  );
};
