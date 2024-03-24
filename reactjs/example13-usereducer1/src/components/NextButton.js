export default function NextButton({ dispatch, answer, index, numOfQuestion }) {
  if (answer === null) {
    return;
  }
  if (index + 1 < numOfQuestion) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  if (index + 1 === numOfQuestion) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
  }
}
