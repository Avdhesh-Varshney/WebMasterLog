import useQuestionStore from "../../store/zustand";
import { useNavigate, useParams } from "react-router-dom";
import TimeStamp from "../../components/TimeStamp/TimeStamp";
import { useEffect } from "react";
import AnimateProvider from "../../components/AnimateProvider/AnimateProvider";
import Question from "../../components/Questions/Questions";

function SingleQuestion() {
  const navigate = useNavigate();
  const {
    question: allQuestion,
    trueAction,
    falseAction,
    addAnswer,
    page,
    nextPage,
  } = useQuestionStore();

  const { id } = useParams();

  useEffect(() => {
    if (Number(id) < page) {
      navigate(`/question/${page}`);
    }
  }, [id]);

  const singleQuestion = allQuestion?.[page - 1];
  const { correct_answer } = singleQuestion;

  const handleClick = (value) => {
    //Add answer
    addAnswer({ question: singleQuestion.question, answer: value });

    //Verify Answer
    if (value === correct_answer) {
      trueAction();
    } else {
      falseAction();
    }

    nextPage();

    navigate(
      page === allQuestion.length ? "/finish" : `/question/${Number(id) + 1}`
    );
  };

  return (
    <AnimateProvider className="max-w-xl mx-auto">
      <div className="flex max-w-fit flex-col ml-auto space-x-3 mb-10">
        <TimeStamp />
      </div>

      <Question
        id={page}
        handleClick={handleClick}
        singleQuestion={singleQuestion}
      />
    </AnimateProvider>
  );
}

export default SingleQuestion;
