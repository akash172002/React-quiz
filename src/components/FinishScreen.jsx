import { useQuestion } from "../context/QuestionContext";

/* eslint-disable react/prop-types */
function FinishScreen() {
  const { points, maxpossiblePoints, highscore, dispatch } = useQuestion();
  const percentage = (points / maxpossiblePoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong> {points}</strong> out of {maxpossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore:{highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart the game
      </button>
    </>
  );
}

export default FinishScreen;
