import { LOGO_URL } from "../utils/constants";

const Header = () => {
  return (
    <div className="header-container">
      <img className="logo" src={LOGO_URL}></img>
      <ul className="menu-items">
        <li>Home</li>
        <li>Offers</li>
        <li>About</li>
        <li>Cart</li>
      </ul>
    </div>
  );
};

export default Header;
