import { useEffect, useState } from "react";

//Get the API key using https://www.omdbapi.com/apikey.aspx
const API_KEY = "5c0280e";

export function useMovieDetails(movieId) {
  const [movie, setMovie] = useState({});
  const [isMovieDetailsLoading, setIsMovieDetailsLoading] = useState(false);

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

  return { movie, isMovieDetailsLoading };
}
