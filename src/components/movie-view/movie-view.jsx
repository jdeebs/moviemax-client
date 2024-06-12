import PropTypes from "prop-types";
import { Col, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

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
        </Col>
      </Row>
    </Container>
  );
};

// Define props constraints for MovieCard
MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
