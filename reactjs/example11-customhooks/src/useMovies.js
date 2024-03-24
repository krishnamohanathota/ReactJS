import { useEffect, useState } from "react";

//Get the API key using https://www.omdbapi.com/apikey.aspx
const API_KEY = "5c0280e";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return { movies, loading, error };
}
