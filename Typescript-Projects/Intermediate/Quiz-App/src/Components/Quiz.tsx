import Question from "./Question";
import questions from "../data/questions.json";
import { useState } from "react";
import { DiVim } from "react-icons/di";

function Quiz() {
  const [curIndex, setCurIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  function onSelect(choice: string): void {
    const curqn = questions[curIndex];
    if (choice === curqn.answer) setScore(score + 1);

    const nxtqnIndex = curIndex + 1;
    if (nxtqnIndex < questions.length) setCurIndex(nxtqnIndex);
    else setShowResults(true);
  }
  function restart():void{
     setShowResults(false);
     setCurIndex(0);
     setScore(0);
  }
  if (showResults) {
    return(
    <div>
      <h1 className="text-center text-[25px]">
        Your score is {score} out of {questions.length}

      </h1>
      <div className="flex gap-5 mt-8 w-[20vw] mx-auto">
      <button className="css-button-3d--black" onClick={()=>restart()}>Restart</button>
      <button className="css-button-3d--black" onClick={()=>restart()}>Exit</button>
      </div>
    </div>);
  }
  return (
    <div>
      <Question
        choices={questions[curIndex].choices}
        question={questions[curIndex].question}
        onSelect={onSelect}
      />
    </div>
  );
}

export default Quiz;
