import { useQuestion } from "../context/QuestionContext";
import Options from "./Options";

/* eslint-disable react/prop-types */
function Question() {
  const { questions, index } = useQuestion();
  const question = questions.at(index);
  console.log(question);
  return (
    <div>
      <h4>{question?.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
