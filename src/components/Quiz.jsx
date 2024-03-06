import { useState } from "react";
import QUESTIONS from "../questions";
import imgQuizCompleted from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer";

export default function Quiz()
{
const [userAnswers, setUserAnswers]=useState([]);
const activeQuestionIndex=userAnswers.length;
const quizIsComplete= QUESTIONS.length===activeQuestionIndex;

if(quizIsComplete)
{
    return <div id="summary">
        <img src={imgQuizCompleted} alt="" />
        <h2>Quiz Completed!</h2>
    </div>
}

function handleClickAnswer(answer)
{
setUserAnswers((prevAnswers)=>
{
    return [...prevAnswers,answer];
})
}

const shuffledAnswers=[...QUESTIONS[activeQuestionIndex].answers];
shuffledAnswers.sort(()=>Math.random()-0.5)

return <div id="quiz">
    <div id="question">
    <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeOut={()=>{handleClickAnswer(null)}}/>
    <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
    <ul id="answers">
        {shuffledAnswers.map((answer)=>
        <li key={answer} className="answer">
            <button onClick={()=>handleClickAnswer(answer)}>
                {answer}
            </button>
         </li>
        )}
    </ul>

    </div>
</div>
}