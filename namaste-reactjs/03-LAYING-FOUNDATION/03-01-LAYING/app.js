import React from "react";
import ReactDOM from "react-dom/client";
/*
const heading = React.createElement("h1", { id: "heading" }, "Hello World");
console.log(heading);
*/

const jsxHeading = <h1 className="heading">Hello World - JSX</h1>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsxHeading);
