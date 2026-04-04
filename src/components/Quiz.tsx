import { useState } from "react"
import QUESTION from "../questions"

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    const activeQuestionIndex = userAnswers.length;

    const shuffledAnswers = [...QUESTION[activeQuestionIndex].answers];

    shuffledAnswers.sort( () => Math.random() - 0.5);

    function handleSelectAnswer(selectedAnswer : string) {
        setUserAnswers((prevUserAnswers:string[]) => {
            return [...prevUserAnswers, selectedAnswer]
        });
    }

    return <section id="quiz">
        <section id="question">
            <h2>{QUESTION[activeQuestionIndex].text}</h2>
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