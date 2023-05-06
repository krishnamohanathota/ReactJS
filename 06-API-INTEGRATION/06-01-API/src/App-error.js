import React from "react";

function App() {
  const isLoggedIn = true;

  return (
    <div>
      {if (isLoggedIn) {
        <p>Welcome</p>;
      } else {
        <p>Please log in</p>;
      }}
    </div>
  );
}