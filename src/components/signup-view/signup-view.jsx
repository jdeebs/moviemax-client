import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export const SignupView = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    birthday: "",
  });
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password" || name === "confirmPassword") {
      validatePasswords(
        name === "password" ? value : formData.password,
        name === "confirmPassword" ? value : formData.confirmPassword
      );
    }
  };

  const validatePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else if (password.length > 0 && password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (passwordError) {
      alert("Please fix the password errors before submitting.");
      return;
    }

    const data = {
      Username: formData.username,
      Password: formData.password,
      Email: formData.email,
      Birthday: formData.birthday,
    };

    fetch("https://movie-max-f53b34b56a95.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        // Navigate to login view upon successful signup
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <Container className="signup-section mb-4 p-4">
      <Row className="justify-content-center">
        <Col md={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="3"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                isInvalid={!!passwordError}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">
                {passwordError}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="signup-button">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
