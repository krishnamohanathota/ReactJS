import React from "react";
import ReactDOM from "react-dom/client";

//JSX (JSX is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript files)
const heading = <h1> hello KM! </h1>;

console.log(heading);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
