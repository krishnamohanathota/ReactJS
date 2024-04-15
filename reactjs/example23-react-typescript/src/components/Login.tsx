import * as React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import userActions from "../actions/userActions";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import ApiService from "../util/ApiService";

import { API_BASE_URL } from "./../constants/constants";

export default function Login() {
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //const userName = useSelector((store: RootState) => store.user.userName);
  //const loginStatus = useSelector((store: RootState) => store.user.loginStatus);

  const { userName, loginStatus } = useSelector(
    (store: RootState) => store.user
  );

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) {
      console.log("Please provide username and password");
      return;
    }

    if (!API_BASE_URL) {
      console.log("API URL not found");
      return;
    }

    const apiService = new ApiService(API_BASE_URL);
    const data = await apiService.login(email, password);

    dispatch(userActions.setLoginStatus(true));
    dispatch(userActions.setUserName(email));
  }

  useEffect(() => {
    if (userName && loginStatus) {
      navigate("/app");
    }
  }, [userName, loginStatus]);

  return (
    <main>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button>Login</button>
        </div>
      </form>
    </main>
  );
}
