import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  //This hook allows you to add state variables to functional components.
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        throw new Error("Error fetching advice : ${res.statusText}");
      }
      const data = await res.json();
      //const advice = data.slip.advice;
      // Object Destructuring
      const { advice } = data.slip;
      console.log(advice);
      setAdvice(advice);
      setCount(count + 1);
    } catch (error) {
      console.error("Unable to fetch advice", error);
      setAdvice("Unable to get advice. Please try again later");
    }
  }
  async function clearAdvice() {
    setAdvice("");
    setCount(0);
  }

  //When Page loading for the first time
  useEffect(() => {
    getAdvice();
  }, []);

  //JSX
  return (
    <div>
      <h1>{advice || "Please click below button to get a new advice"}</h1>
      <button onClick={getAdvice}>Get Advice </button>
      <button onClick={clearAdvice}>Clear Advice </button>
      {/* 
      <p>
        You got <strong>{count}</strong> advices
      </p>
  */}
      <Message count={count} />
    </div>
  );
}

function Message(props) {
  return (
    <p>
      You have got <strong>{props.count}</strong> advices
    </p>
  );
}
