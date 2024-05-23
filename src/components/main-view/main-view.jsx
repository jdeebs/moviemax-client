export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: {
        $oid: "66387d707e234733d72202d8",
      },
      Title: "Silence of the Lambs",
      Description:
        "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer.",
      Genre: {
        Name: "Thriller",
        Description:
          "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
      },
      Director: {
        Name: "Jonathan Demme",
        Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
        Birth: "1944",
        Death: "2017",
      },
      ImagePath: "silenceofthelambs.png",
      Featured: true,
      Actors: ["Anthony Hopkins", "Jodie Foster", "Kasi Lemmings"],
    },
    {
      _id: {
        $oid: "6639bb7e491a0a26da3434b5",
      },
      Title: "The Shawshank Redemption",
      Description:
        "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      Genre: {
        Name: "Drama",
        Description:
          "Drama is a category of narrative fiction intended to be more serious than humorous in tone, focusing on in-depth development of realistic characters who must deal with realistic emotional struggles.",
      },
      Director: {
        Name: "Frank Darabont",
        Bio: "Frank Darabont is a Hungarian-American film director, screenwriter and producer.",
        Birth: "1959",
      },
      ImagePath: "shawshankredemption.png",
      Featured: true,
      Actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    },
    {
      _id: {
        $oid: "6639bbf6491a0a26da3434b7",
      },
      Title: "The Godfather",
      Description:
        "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      Genre: {
        Name: "Crime",
        Description:
          "Crime films are a genre of film that focus on crime, criminals, and the criminal justice system. These films can be fictional dramas or true stories.",
      },
      Director: {
        Name: "Francis Ford Coppola",
        Bio: "Francis Ford Coppola is an American film director, producer, and screenwriter. He was a central figure in the New Hollywood filmmaking movement of the 1960s and 1970s.",
        Birth: "1939",
      },
      ImagePath: "godfather.png",
      Featured: true,
      Actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
