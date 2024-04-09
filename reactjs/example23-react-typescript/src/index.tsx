import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store, initReduxStore } from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";

import "./app.css";

initReduxStore((err: any) => {
  if (!err) {
    const rootElement = document.getElementById("root")!;
    const root = createRoot(rootElement);

    root.render(renderApp());
  }
});

function renderApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
