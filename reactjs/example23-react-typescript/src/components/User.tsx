import * as React from "react";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import userActions from "../actions/userActions";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../constants/constants";
import ApiService from "../util/ApiService";

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

  async function getUserProfile() {
    if (!API_BASE_URL) {
      console.log("API URL not found");
      return;
    }
    const apiService = new ApiService(API_BASE_URL);
    const data = await apiService.getUserProfile();
    console.log(data);
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <button onClick={getUserProfile}>View Profile</button>
      </p>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  );
}

export default User;
