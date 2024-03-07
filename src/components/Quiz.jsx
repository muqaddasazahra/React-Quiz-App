import { useRef, useState } from "react";
import QUESTIONS from "../questions";
import imgQuizCompleted from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers"

export default function Quiz() {
  
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = QUESTIONS.length === activeQuestionIndex;

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={imgQuizCompleted} alt="" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  function handleClickAnswer(answer) {
    setAnswerState("answered");
    setUserAnswers((prevAnswers) => {
      return [...prevAnswers, answer];
    });

    setTimeout(() => {
      if (answer === QUESTIONS[activeQuestionIndex].answers[0])
        setAnswerState("correct");
      else setAnswerState("wrong");

      setTimeout(() => {
        setAnswerState("");
      }, 2000);
    }, 1000);
  }
  
  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeOut={() => {
            handleClickAnswer(null);
          }}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <Answers
          
          answers={QUESTIONS[activeQuestionIndex].answers}
          selectedAnswer={userAnswers[userAnswers.length - 1]}
          answerState={answerState}
          onSelect={handleClickAnswer}
        />
      </div>
    </div>
  );
}
