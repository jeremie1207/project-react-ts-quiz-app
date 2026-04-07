import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions";
import quizCompleted from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const shuffledAnswers = useRef<string[] | undefined>(undefined);
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

  if (quizIsCompleted) {
    return (
      <div id="summary">
        <img src={quizCompleted} alt="quiz completed" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTIONS[activeQuestionIndex].answers].sort(
      () => Math.random() - 0.5,
    );
  }

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState("answered");

      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex],
  );

  const timerOutHandler = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  return (
    <section id="quiz">
      <section id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          timerOutHandler={timerOutHandler}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.current.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";

            if (answerState === "answered" && isSelected) {
              cssClass = "selected";
            }

            if (
              answerState === "correct" ||
              (answerState === "wrong" && isSelected)
            ) {
              cssClass = answerState;
            }

            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
