import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:9001";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, cities: action.payload };

    case "city/current":
      return { ...state, currentCity: action.payload };

    case "city/create":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "loading":
      return { ...state, isLoading: action.payload };

    case "error":
      return { ...state, error: action.payload };

    default:
      throw new Error("Invalid Action Type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getCities() {
      try {
        dispatch({ type: "loading", payload: true });
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("Unable to get data");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (e) {
        dispatch({ type: "error", payload: e });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    }

    getCities();
  }, []);

  async function getCityDetails(id) {
    try {
      dispatch({ type: "loading", payload: true });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("Unable to get city details");
      const data = await res.json();
      dispatch({ type: "city/current", payload: data });
    } catch (e) {
      dispatch({ type: "error", payload: e });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading", payload: true });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Unable to add new city");
      const data = await res.json();

      dispatch({ type: "city/create", payload: data });
    } catch (e) {
      dispatch({ type: "error", payload: e });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading", payload: true });
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Unable to delete city");
      const data = await res.json();

      dispatch({ type: "city/delete", payload: id });
    } catch (e) {
      dispatch({ type: "error", payload: e });
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  //Return Provider
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
