/* eslint-disable react/prop-types */

import { useQuestion } from "../context/QuestionContext";

function Progress() {
  const { index, numQuestions, points, maxpossiblePoints, answer } =
    useQuestion();

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxpossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
