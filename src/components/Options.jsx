import { useQuestion } from "../context/QuestionContext";

/* eslint-disable react/prop-types */
function Options({ question }) {
  const { dispatch, answer } = useQuestion();

  const hasAnswered = answer !== null;

  return (
    <div>
      <div className="options">
        {question?.options.map((option, index) => (
          <button
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            key={option}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={answer !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
