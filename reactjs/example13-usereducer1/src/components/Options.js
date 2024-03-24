export default function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  const correctOption = question.correctOption;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={(e) => {
            /*
            const selectedAnswerText = e.target.innerText;
            const correctAnswerText = question.options[question.correctOption];
            console.log(selectedAnswerText);
            console.log(correctAnswerText);
            if (selectedAnswerText === correctAnswerText)
              console.log("Correct Answer is selected");
            else console.log("Wrong Answer is selected");
            */
            dispatch({ type: "newAnswer", payload: index });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
