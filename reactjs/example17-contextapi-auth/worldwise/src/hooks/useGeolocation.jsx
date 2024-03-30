import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    //console.log("getPosition --> ");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
        //console.log(pos.coords.latitude + "," + pos.coords.longitude);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
        console.log(error.message);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
