const heading = React.createElement(
  "h1",
  { id: "heading", title: "This is a title." },
  "React Heading from a Separate JS file"
);

console.log(heading);

const root = ReactDOM.createRoot(document.getElementById("react"));

root.render(heading);
