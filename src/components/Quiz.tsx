import { useState, useCallback } from "react"
import QUESTIONS from "../questions"
import quizCompleted from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

    if(quizIsCompleted) {
        return <div id="summary">
            <img src={quizCompleted} alt="quiz completed" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];

    shuffledAnswers.sort( () => Math.random() - 0.5);

    
    
    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        });
    }, [])

    const timerOutHandler = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer])

    

    return <section id="quiz">
        <section id="question">
            <QuestionTimer key={activeQuestionIndex} timeout={10000} timerOutHandler={timerOutHandler} />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id="answers">
                {shuffledAnswers.map(answer => {
                    return <li key={answer} className="answer">
                        <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                    </li>
                })}
            </ul>
        </section>
    </section>
    
    
}