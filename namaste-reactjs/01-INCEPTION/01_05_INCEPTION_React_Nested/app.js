/*
<div id = parent>
  <div id = child1>
    <h1 id = "heading"> React Nested Child Heading from a Separate JS file </h1>
    <h2 id = "heading"> Child#2 </h1>
  </div>
  <div id = child2>
    <h1 id = "heading"> React Nested Child Heading from a Separate JS file </h1>
    <h2 id = "heading"> Child#2 </h1>
  </div>
</div>
*/

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child1" }, [
    React.createElement(
      "h1",
      { id: "heading1", title: "This is a heading1." },
      "React Nested elements"
    ),
    React.createElement(
      "h2",
      { id: "heading2", title: "This is a heading2." },
      "React Nested elements. Child#2"
    ),
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement(
      "h1",
      { id: "heading1", title: "This is a heading1." },
      "React Nested elements"
    ),
    React.createElement(
      "h2",
      { id: "heading2", title: "This is a heading2." },
      "React Nested elements. Child#2"
    ),
  ]),
]);

console.log(parent);

const root = ReactDOM.createRoot(document.getElementById("react"));

root.render(parent);
