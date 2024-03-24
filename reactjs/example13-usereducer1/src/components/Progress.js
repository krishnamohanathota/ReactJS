export default function Progress({
  index,
  numOfQuestion,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numOfQuestion}
        value={index + Number(answer != null)}
      ></progress>
      <p>
        Question {index + 1} / {numOfQuestion}
      </p>
      <p>
        Score {points} / {maxPossiblePoints}
      </p>
    </header>
  );
}
