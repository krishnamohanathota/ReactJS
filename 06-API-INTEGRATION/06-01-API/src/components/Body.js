import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
//import reslist from "../utils/mockdata";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/constants";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filterResList, setFilterResList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("useEffect is called after component is rendered..");
    fetchRestaurants();
  }, []);

  /**
   * Fetch Restaurants
   */
  async function fetchRestaurants() {
    try {
      const data = await fetch(API_URL);
      const json = await data.json();
      setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
      setFilterResList(json?.data?.cards[2]?.data?.data?.cards);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Search Restaurants based on search text
   * @param {*} searchText
   * @returns
   */
  function searchRestaurantList(
    searchText,
    allRestaurants,
    isAvgRatingFilter = false
  ) {
    let data = [];

    if (searchText != "") {
      data = allRestaurants.filter((restaurant) =>
        restaurant?.data?.name.toLowerCase().includes(searchText.toLowerCase())
      );
      if (isAvgRatingFilter) {
        data = data.filter((restaurant) => restaurant.data.avgRating > 4);
      }
    } else {
      if (isAvgRatingFilter) {
        data = allRestaurants.filter(
          (restaurant) => restaurant.data.avgRating > 4
        );
      } else {
        data = allRestaurants;
      }
    }

    if (data.length === 0) {
      setErrorMessage("No matched restaurants found");
      setFilterResList([]);
    } else {
      setErrorMessage("");
      setFilterResList(data);
    }
  }

  /**
   * Search Top Rated Restaurants
   */
  function searchTopRatedRestaurantList(allRestaurants) {
    setSearchText("");
    const data = allRestaurants.filter(
      (restaurant) => restaurant.data.avgRating > 4
    );
    if (data.length === 0) {
      setErrorMessage("No top rated restaurants found");
    } else {
      setErrorMessage("");
      setFilterResList(data);
    }
  }

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="txt-box"
          placeholder="Search a restaurant you want"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>

        <button
          className="search-btn"
          onClick={() => {
            searchRestaurantList(searchText, allRestaurants);
          }}
        >
          Search
        </button>

        <button
          className="filter-btn"
          onClick={() => {
            searchRestaurantList(searchText, allRestaurants, true);
          }}
        >
          Filter Top Rated Restaurants
        </button>
      </div>

      {errorMessage && <div className="error-container">{errorMessage}</div>}

      <div className="body-container">
        {filterResList?.length > 0
          ? filterResList.map((res) => (
              <RestaurantCard key={res.data?.id} resData={res} />
            ))
          : !errorMessage && <Shimmer />}
      </div>
    </>
  );
};

export default Body;
