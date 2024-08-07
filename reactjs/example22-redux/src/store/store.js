import { combineReducers, createStore } from "redux";

import accountReducer from "../reducers/accountSlice";
import customerReducer from "../reducers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;
