import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-max-f53b34b56a95.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    // Clear local storage upon logout
    localStorage.removeItem("user", "token");
  };

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <div>Or sign up</div>
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <>
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
            <hr />
            <h2>Similar Movies</h2>
            <Row>
              {movies
                .filter(
                  (movie) =>
                    movie.Genre.Name === selectedMovie.Genre.Name &&
                    movie._id !== selectedMovie._id
                )
                .map((movie) => (
                  <Col className="mb-5" key={movie._id} md={3}>
                    <MovieCard
                      movie={movie}
                      onMovieClick={(newSelectedMovie) =>
                        setSelectedMovie(newSelectedMovie)
                      }
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button onClick={handleLogout}>Logout</Button>
          </Col>
        </>
      ) : movies.length === 0 ? (
        <Col>
          <div>The list is empty!</div>
          <Button onClick={handleLogout}>Logout</Button>
        </Col>
      ) : (
        <>
          {movies.map((movie) => (
            <Col className="mb-5" key={movie._id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
          <Col md={12} className="d-flex justify-content-end">
            <Button onClick={handleLogout}>Logout</Button>
          </Col>
        </>
      )}
    </Row>
  );
};
