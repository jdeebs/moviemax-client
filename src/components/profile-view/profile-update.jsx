import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Col } from "react-bootstrap";

export const ProfileUpdate = ({ username, token, user, onUpdatedUserInfo }) => {
  const [formData, setFormData] = useState({
    Username: user.Username,
    Password: "",
    Email: user.Email,
    Birthday: user.Birthday,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `https://movie-max-f53b34b56a95.herokuapp.com/users/${username}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdatedUserInfo(response.data);
      alert("Profile updated successfully");
    } catch (error) {
      setError(error.message);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Col md={8} className="profile-update">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
            required
            minLength="3"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            name="Birthday"
            value={formData.Birthday}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
        {error && <div className="text-danger mt-3">Error: {error}</div>}
      </Form>
    </Col>
  );
};
