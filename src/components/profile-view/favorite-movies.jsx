import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

export const FavoriteMovies = ({
  favoriteMovies,
  user,
  token,
  onUpdateFavorites,
}) => {
  const handleRemoveFavorite = async (movieId) => {
    try {
      await axios.delete(
        `https://movie-max-f53b34b56a95.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onUpdateFavorites(movieId);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };
  return (
    <>
      <h2 className="mt-4">Favorite Movies</h2>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={3} className="mb-3">
            <Card>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveFavorite(movie._id)}
                >
                  Remove Favorite
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

// Define props constraints for FavoriteMovies
FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onUpdateFavorites: PropTypes.func.isRequired,
};