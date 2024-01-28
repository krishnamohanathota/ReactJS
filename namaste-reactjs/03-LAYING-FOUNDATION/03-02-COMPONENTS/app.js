import React from "react";
import ReactDOM from "react-dom/client";
/*
const heading = React.createElement("h1", { id: "heading" }, "Hello World");
console.log(heading);
*/

const TitleComponent = () => <h1 className="heading">TitleComponent</h1>;

const HeadingComponent = () => (
  <div>
    <TitleComponent />
    <h1 className="heading">Hello World - Functional Component</h1>;
  </div>
);

//JavaScript Expression
const name = "KM";
const xssattack = "<script>alert('Hello World')</script>";

const HeadingComponent1 = () => {
  return (
    <React.Fragment>
      <div>
        <TitleComponent />
        <h2>{name}</h2>
        {xssattack}
        <h1 className="heading">Hello World - Functional Component</h1>
      </div>
      {"---------"}
      <div>
        <TitleComponent />
        <h2>{name}</h2>
        {xssattack}
        <h1 className="heading">Hello World - Functional Component</h1>
      </div>
    </React.Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(HeadingComponent1());
//root.render(<HeadingComponent1 />);
