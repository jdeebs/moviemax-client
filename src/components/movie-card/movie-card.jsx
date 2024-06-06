import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100">
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
        </Card.Body>
      </div>
    </Card>
  );
};

// Define props constraints for MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
