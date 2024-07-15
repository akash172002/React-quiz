import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Mains from "./components/Mains";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import { useQuestion } from "./context/QuestionContext";

function App() {
  const { status } = useQuestion();
  return (
    <>
      <Header />

      <Mains>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />

            <footer>
              <Timer />
              <NextButton />
            </footer>
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Mains>
    </>
  );
}

export default App;
