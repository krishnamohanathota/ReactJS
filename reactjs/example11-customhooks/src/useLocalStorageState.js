import { useEffect, useState } from "react";

export function useLocalStorageState(initialvalue, key) {
  //Function inside useState will be called only during initial render
  const [value, setValue] = useState(() => {
    const watchedMoviesList = localStorage.getItem(key);
    return watchedMoviesList ? JSON.parse(watchedMoviesList) : initialvalue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
