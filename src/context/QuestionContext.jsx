/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const QuestionContext = createContext();

const SEC_PER_QUES = 30;

const initialState = {
  questions: [],

  //loading, error, ready, active finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUES,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("action is unkown");
  }
}

function QuestionProvider({ children }) {
  const [
    { status, questions, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  const maxpossiblePoints = questions.reduce(
    (prev, cur) => prev + cur?.points,
    0
  );
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        status,
        questions,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxpossiblePoints,

        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestion() {
  const context = useContext(QuestionContext);

  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");

  return context;
}

export { QuestionProvider, useQuestion };
