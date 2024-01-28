import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { cloudinaryImageId, name, cuisines, avgRating } = resData?.data;

  const imageURL = CDN_URL + cloudinaryImageId;

  //console.log(imageURL);

  return (
    <div className="restaurant-card">
      <img src={imageURL}></img>
      <h1>{name}</h1>
      <h2>{cuisines.join(", ")}</h2>
      <h3>{avgRating}</h3>
    </div>
  );
};

export default RestaurantCard;
