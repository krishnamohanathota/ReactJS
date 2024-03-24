import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);

  function handleStepDecrease() {
    if (step >= 0) setStep((s) => s - 1);
  }

  function handleStepIncrease() {
    setStep((s) => s + 1);
  }

  function handleCounterDecrease() {
    setCount((c) => (step > 1 ? c - step : c - 1));
  }

  function handleCounterIncrease() {
    setCount((c) => (step > 1 ? step + c : c + 1));
  }

  function addDaysToDate(daysToAdd) {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + daysToAdd);
    return newDate.toLocaleDateString();
  }

  return (
    <div>
      <div>
        <button onClick={handleStepDecrease}>-</button>
        <span>Step : {step}</span>
        <button onClick={handleStepIncrease}>+</button>
      </div>
      <div>
        <button onClick={handleCounterDecrease}>-</button>
        <span>Count : {count}</span>
        <button onClick={handleCounterIncrease}>+</button>
      </div>
      <div>
        {count === 0 ? (
          <span>Today's date is {addDaysToDate(0)}</span>
        ) : (
          <span>
            {count} days from today is {addDaysToDate(count)}
          </span>
        )}
      </div>
    </div>
  );
}
