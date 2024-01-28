import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {
  const [loginText, setLoginText] = useState("Login");

  function loginorlogout() {
    if (loginText === "Login") {
      setLoginText("Logout");
    } else {
      setLoginText("Login");
    }
  }

  return (
    <div className="header-container">
      <img className="logo" src={LOGO_URL}></img>
      <ul className="menu-items">
        <li>Home</li>
        <li>Offers</li>
        <li>About</li>
        <li>Cart</li>
      </ul>
      <button className="login-btn" onClick={() => loginorlogout()}>
        {loginText}
      </button>
    </div>
  );
};

export default Header;
