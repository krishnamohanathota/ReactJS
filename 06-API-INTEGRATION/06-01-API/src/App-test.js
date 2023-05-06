import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useEffect Called");

    return () => {
      console.log("useEffect : Cleanup");
    };
  }, [count]);

  console.log("rendered");

  return (
    <div>
      <p>useState and useEffect testing. couny : {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Clicke Me
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
