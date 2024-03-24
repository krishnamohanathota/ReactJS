import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useMovieDetails } from "./useMovieDetails";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  //Search String : interstellar
  const [query, setQuery] = useState("");
  const [movieId, setMovieId] = useState(null);
  const { movies, loading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

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
  const [userRating, setUserRating] = useState("");
  const { movie, isMovieDetailsLoading } = useMovieDetails(movieId);

  const isWatched = watched.map((movie) => movie.imdbID).includes(movieId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === movieId
  )?.userRating;

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);

  //When Escape key pressed, close the movie
  useKey("Escape", onCloseMovie);

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
      countRatingDecisions: countRef.current,
    };
    //Update Watched Movies List
    onWatched(newWatchedMovie);
    //To Go back to the Wached Movie Screen
    onCloseMovie();
  }

  //This won't work, because 'useState' parameter will execute only during initial render
  //const [isTop, setIsTop] = useState(imdbRating > 8);

  /*
  const [isTop, setIsTop] = useState(imdbRating > 8);
  useEffect(() => {
    setIsTop(imdbRating > 8);
  }, [imdbRating]);
  */

  //Instead of using the above code, we can use the below derived state
  //const isTop = imdbRating > 8;
  //console.log(isTop);

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
  //When page loading is completed, to place focus on the search field
  const inputEl = useRef(null);

  useKey("Enter", function () {
    //If focus is already on that search field, return it
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    //Clear the current text in that field
    setQuery("");
  });

  /*
  useEffect(() => {
    function callback(e) {
      //When key is "Enter" key
      if (e.code === "Enter") {
        //If focus is already on that search field, return it
        if (document.activeElement === inputEl.current) return;

        inputEl.current.focus();
        //Clear the current text in that field
        setQuery("");
      }
    }
    //When user click on enter button, clear the text and place the focus
    document.addEventListener("keydown", callback);

    //return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);
  */

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
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
