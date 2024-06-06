import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 card">
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        <div className="img-container">
          <Card.Img className="card-img" src={movie.ImagePath} />
        </div>
        <Card.Body className="card-body">
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
    Genre: PropTypes.object.isRequired,
    Director: PropTypes.object.isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
