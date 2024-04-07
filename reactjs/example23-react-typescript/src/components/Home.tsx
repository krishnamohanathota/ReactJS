import * as React from "react";
import { Link } from "react-router-dom";

// import "./app.css"; //added line

function Home() {
  return (
    <div>
      <h1 className="underline">Home Page....</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Home;
