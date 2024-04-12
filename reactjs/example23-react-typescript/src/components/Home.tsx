import * as React from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "./../constants/constants";

function Home() {
  return (
    <div>
      <Link to="/">
        <img src="./assets/favicon.png" alt="Logo" />
      </Link>
      <h1 className="underline">Home Page</h1>
      <h1>Env : {process.env.API_BASE_URL}</h1>
      <h1>Env : {API_BASE_URL}</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
