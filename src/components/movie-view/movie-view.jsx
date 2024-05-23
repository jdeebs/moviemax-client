export const MovieView = ({ movie, onMovieClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
