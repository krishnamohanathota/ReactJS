import { useEffect, useState } from "react";
import StarRating from "./StarRating";

/*
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
*/

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//Get the API key using https://www.omdbapi.com/apikey.aspx
const API_KEY = "5c0280e";

export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movieId, setMovieId] = useState(null);

  //const searchQuery = "interstellar";

  /*
  - We shouldn't fetch the data like this (Side Effect)
  - It will create an "infinte loop" if you set the setMovies inside fetch here
  - i.e. So calling any native Web APIs will be considered as a "side effect"
  */
  /*
  fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=interstellar`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
  */

  /*
  useEffect(() => {
    try {
      setLoading(true);
      fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=interstellar`)
        .then((res) => res.json())
        .then((data) => setMovies(data.Search));
      setLoading(false);
    } catch {
    } finally {
    }
  }, []);
  */

  function handleMovieClick(id) {
    setMovieId((movieId) => (movieId === id ? null : id));
  }

  function handleCloseMovie() {
    setMovieId(null);
  }

  function handleWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  //Delete from watched list
  function handleWatchedDelete(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  //Effect runs after every render. When dependency array is [], it calls only after 1st render
  useEffect(
    function () {
      //This is Browserver API.
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          //https://www.omdbapi.com/
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Unable to fetch movies");
          }

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movies not found");
          }

          //console.log(data.Search);
          setMovies(data.Search);
          setError("");
        } catch (e) {
          console.log(e.message);
          //When request is Aborted (i.e. refer to the below cleanup function), don't
          if (e.message !== "AbortError") setError(e.message);
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setLoading(false);
        setError("");
        return;
      }
      fetchMovies();

      return function () {
        //Cancel the current request when new request received.
        //(i.e. When you keep on typing, multipls fetch requests will be triggered.
        //when new request is submitted, abort the previous request)
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {loading && <Loading />}
          {!loading && error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <MoviesList movies={movies} onMovieClick={handleMovieClick} />
          )}
        </Box>
        <Box>
          {movieId ? (
            <MovieDetails
              movieId={movieId}
              onCloseMovie={handleCloseMovie}
              onWatched={handleWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleWatchedDelete}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieDetails({ movieId, onCloseMovie, onWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isMovieDetailsLoading, setIsMovieDetailsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === movieId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie || {};

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setMovie(null);
          setIsMovieDetailsLoading(true);
          //https://www.omdbapi.com/
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
          );

          if (!res.ok) {
            throw new Error("Unable to fetch movie details");
          }

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          //console.log(data);
          setMovie(data);
        } catch (e) {
          console.log(e.message);
        } finally {
          setIsMovieDetailsLoading(false);
        }
      }
      getMovieDetails();
    },
    [movieId]
  );

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    //Cleanup Function (Executes when component is unmounted)
    return function () {
      document.title = "Movies List";
    };
  }, [title]);

  function handleWatched() {
    const newWatchedMovie = {
      imdbID: movieId,
      title,
      year,
      poster,
      userRating,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };
    //Update Watched Movies List
    onWatched(newWatchedMovie);
    //To Go back to the Wached Movie Screen
    onCloseMovie();
  }

  return (
    <div className="details">
      {isMovieDetailsLoading ? (
        <Loading message="Loading Movie Details...." />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                    defaultRating={watchedUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleWatched}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have rated this movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function ErrorMessage({ message }) {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
}

function Loading({ message = "Loading....." }) {
  return (
    <div className="loader">
      <p>{message}</p>
    </div>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MoviesList({ movies, onMovieClick }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onMovieClick={onMovieClick} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie, onMovieClick }) {
  return (
    <li onClick={() => onMovieClick(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
