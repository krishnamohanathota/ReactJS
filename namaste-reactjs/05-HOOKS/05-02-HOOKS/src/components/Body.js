import RestaurantCard from "./RestaurantCard";
import reslist from "../utils/mockdata";
import { useState } from "react";

/**
 * Search Restaurants based on search text
 * @param {*} searchText
 * @returns
 */
function searchRestaurantList(searchText) {
  return reslist.filter((restaurant) =>
    restaurant?.data?.name.toLowerCase().includes(searchText.toLowerCase())
  );
}

/**
 * Search Top Rated Restaurants
 */
function searchTopRatedRestaurantList() {
  return reslist.filter((restaurant) => restaurant.data.avgRating > 4);
}

const Body = () => {
  const [filterResList, setFilterResList] = useState(reslist);
  const [searchText, setSearchText] = useState("");

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
            setFilterResList(searchRestaurantList(searchText));
          }}
        >
          Search
        </button>

        <button
          className="filter-btn"
          onClick={() => {
            const filterdResList = searchTopRatedRestaurantList();
            setFilterResList(filterdResList);
          }}
        >
          Filter Top Rated Restaurants
        </button>
      </div>

      <div className="body-container">
        {filterResList.map((res) => (
          <RestaurantCard key={res.data?.id} resData={res} />
        ))}
      </div>
    </>
  );
};

export default Body;
