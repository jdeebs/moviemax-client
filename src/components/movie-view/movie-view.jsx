import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export const MovieView = ({ user, token, onFavorite }) => {
  const movies = useSelector((state) => state.movies.list);
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.FavoriteMovies.includes(movieId)) {
      setIsFavorite(true);
    }
  }, [movieId, user.FavoriteMovies]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(
          `https://movie-max-f53b34b56a95.herokuapp.com/users/${user.Username}/movies/${movieId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          `https://movie-max-f53b34b56a95.herokuapp.com/users/${user.Username}/movies/${movieId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      onFavorite(movieId, !isFavorite);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating favorite movie:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6} className="mb-4">
          <img
            src={movie.ImagePath}
            alt={movie.Title}
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <h3 className="mb-3">{movie.Title}</h3>
          <p>
            <strong>Description: </strong> {movie.Description}
          </p>
          <p>
            <strong>Genre: </strong> {movie.Genre.Name}
          </p>
          <p>
            <strong>Director: </strong> {movie.Director.Name}
          </p>
          <p>
            <strong>Cast: </strong> {movie.Actors.join(", ")}
          </p>
          <Link to={`/`}>
            <Button className="back-button">Back</Button>
          </Link>
          <Button
            onClick={handleFavorite}
            variant={isFavorite ? "danger" : "primary"}
            className="favorite-button"
          >
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

// Define props constraints for MovieCard
MovieView.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  onFavorite: PropTypes.func.isRequired,
};
