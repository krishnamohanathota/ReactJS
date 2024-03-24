import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<App />);

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
