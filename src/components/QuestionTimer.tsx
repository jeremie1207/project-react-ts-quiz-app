import { useEffect, useState } from "react";

type QuestionTimerProps = {
    timeout: number;
    timerOutHandler: () => {}; 
}

export default function QuestionTimer({timeout, timerOutHandler} : QuestionTimerProps) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(timerOutHandler, timeout);
        return () => {
            clearTimeout(timer);
        }
    }, [timeout, timerOutHandler])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime: number) => prevRemainingTime - 100);
        }, 100)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return <progress value={remainingTime} max={timeout}/>
}