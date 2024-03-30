import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:9001";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("Unable to get data");
        const data = await res.json();
        //console.log(data);
        setCities(data);
      } catch (e) {
        console.log("Error : " + e);
      } finally {
        setIsLoading(false);
      }
    }

    getCities();
  }, []);

  async function getCityDetails(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("Unable to get city details");
      const data = await res.json();
      //console.log("Current City Details:" + data);
      setCurrentCity(data);
    } catch (e) {
      console.log("Error : " + e);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Unable to add new city");
      const data = await res.json();
      //console.log(data);
      setCities((cities) => [...cities, data]);
    } catch (e) {
      console.log("createCity: " + e);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Unable to delete city");
      const data = await res.json();
      console.log(data);
      //Remove the city from the state also
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (e) {
      console.log("createCity: " + e);
    } finally {
      setIsLoading(false);
    }
  }

  //Return Provider
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCityDetails,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("City conext is used in wrong place");
  return context;
}

export { CitiesProvider, useCities };
