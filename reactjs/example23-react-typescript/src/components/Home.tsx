import * as React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/">
        <img src="./assets/favicon.png" alt="Logo" />
      </Link>
      <h1 className="underline">Home Page....</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
