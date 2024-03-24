import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <>
      <Steps />
      <Steps />
    </>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function openClose() {
    setIsOpen((x) => !x);
  }

  return (
    <div>
      <div className="close" onClick={openClose}>
        &times;
      </div>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          {/*
            <p className="message">
              Step {step} : {messages[step - 1]}
            </p>
          */}
          <StepMessage step={step}>
            {messages[step - 1]}
            <Button
              bgColor="#e7e7e7"
              textColor="#333"
              onClick={() => alert("test")}
            >
              Learn how ?
            </Button>
          </StepMessage>

          <div className="buttons">
            {/*
              <button
                style={{ backgroundColor: "#7950f2", color: "#fff" }}
                onClick={handleNext}
              >
                Next
              </button>
              <button
                style={{ backgroundColor: "#7950f2", color: "#fff" }}
                onClick={handlePrevious}
              >
                Previous
              </button>
            */}
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              <span>👉</span>Next
            </Button>

            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              Previous<span>👈</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}
function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
