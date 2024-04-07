import * as React from "react";

import { useDispatch } from "react-redux";
import userActions from "../actions/userActions";
import { useNavigate } from "react-router-dom";

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    //POst API request for Logout Action
    dispatch(userActions.setLogout());

    //Create the Local Storage to remove Redux state
    localStorage.clear();

    //Nagigate to Home Page
    navigate("/");
  };

  return (
    <div>
      <h2>User Section</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;
