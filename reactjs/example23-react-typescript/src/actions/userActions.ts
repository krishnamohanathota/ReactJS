const Constants = {
  userName: "userName",
  loginStatus: "loginStatus",
  logout: "logout",
};

const setLoginStatus = (data: boolean) => ({
  type: Constants.loginStatus,
  payload: data,
});

const setUserName = (data: any) => ({
  type: Constants.userName,
  payload: data,
});

const setLogout = () => ({
  type: Constants.logout,
});

export default {
  Constants,
  setUserName,
  setLoginStatus,
  setLogout,
};
