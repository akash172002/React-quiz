import { useQuestion } from "../context/QuestionContext";

/* eslint-disable react/prop-types */
function StartScreen() {
  const { numQuestions, dispatch } = useQuestion();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let&apos;s Start
      </button>
    </div>
  );
}

export default StartScreen;
