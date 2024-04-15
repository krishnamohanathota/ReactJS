import userActions from "../actions/userActions";

export interface IUserState {
  userName?: string;
  loginStatus?: boolean;
}

const initialState: IUserState = {
  userName: "",
  loginStatus: false,
};

export default function userReducer(
  state: IUserState = initialState,
  action: any
) {
  //console.log(action.type);

  switch (action.type) {
    case userActions.Constants.userName:
      return {
        ...state,
        userName: action.payload,
      };

    case userActions.Constants.loginStatus:
      return { ...state, loginStatus: action.payload };

    case userActions.Constants.logout:
      return { ...state, loginStatus: false, userName: "" };

    default:
      return state;
  }
}
