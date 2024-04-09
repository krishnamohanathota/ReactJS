import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers, createStore } from "redux";

import userReducer from "../reducers/userReducer";
import productReducer from "../reducers/productReducer";

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
  timeout: 100, //https://github.com/rt2zz/redux-persist/issues/816
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore() {
  const _store = createStore(persistedReducer);

  return _store;
}

export const store = configureStore();
export const persistor = persistStore(store);

export function initReduxStore(cb: (error: any) => void) {
  try {
    persistStore(store, null, () => {
      cb(null); // No error occurred during store initialization
    });
  } catch (error) {
    cb(error); // Pass any errors that occur during initialization to the callback
  }
}
