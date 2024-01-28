import RestaurantCard from "./RestaurantCard";
import reslist from "../utils/mockdata";
import { useState } from "react";

const Body = () => {
  const [restaurantlist, filterResList] = useState(reslist);

  return (
    <>
      <button
        className="filter-btn"
        onClick={() => {
          const filterdResList = restaurantlist.filter(
            (restaurant) => restaurant.data.avgRating > 4
          );
          filterResList(filterdResList);
        }}
      >
        Filter Top Rated Restaurants
      </button>
      <div className="body-container">
        {restaurantlist.map((res) => (
          <RestaurantCard key={res.data?.id} resData={res} />
        ))}
      </div>
    </>
  );
};

export default Body;
