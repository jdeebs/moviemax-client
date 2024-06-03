import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [error, setError] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://movie-max-f53b34b56a95.herokuapp.com/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
      });
  }, []);

  if (!user) {
    return <LoginView />;
  }

  if (selectedMovie) {
    let similarMovies = movies.filter(
      (movie) =>
        movie.Genre.Name === selectedMovie.Genre.Name &&
        movie._id !== selectedMovie._id
    );
    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) =>
              setSelectedMovie(newSelectedMovie)
            }
          />
        ))}
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
