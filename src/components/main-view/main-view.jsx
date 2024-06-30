import { useState, useEffect } from "react";
import { MoviesList } from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies/movies";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const movies = useSelector((state) => state.movies.list);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-max-f53b34b56a95.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        // Dispatch action to set movies in the Redux store
        dispatch(setMovies(data));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error.message);
      });
  }, [token, dispatch]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    // Clear local storage upon logout
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleFavorite = (movieId, isAdding) => {
    const updatedUser = {
      ...user,
      FavoriteMovies: isAdding
        ? [...user.FavoriteMovies, movieId]
        : user.FavoriteMovies.filter((id) => id !== movieId),
    };
    setUser(updatedUser);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          handleLogout();
        }}
      />
      <Container>
        <Row className="justify-content-center">
          <Col>
            <Routes>
              <Route
                path="/users"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <LoginView
                          onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                          }}
                        />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    {!user ? <Navigate to="/login" replace /> : <MoviesList />}
                  </>
                }
              />
              <Route
                path="/users/:Username"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : (
                      <Col xs={12}>
                        <ProfileView
                          username={user.Username}
                          token={token}
                          movies={movies}
                          onLogout={handleLogout}
                        />
                      </Col>
                    )}
                  </>
                }
              />
              <Route
                path="/movies/:movieId"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView
                          user={user}
                          token={token}
                          onFavorite={handleFavorite}
                        />
                      </Col>
                    )}
                  </>
                }
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
