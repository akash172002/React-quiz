/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useQuestion } from "../context/QuestionContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuestion();
  const mins = Math.floor(secondsRemaining / 60);
  const sec = Math.floor(secondsRemaining % 60);

  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
