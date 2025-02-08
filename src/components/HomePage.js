'use client'
import { useState } from "react"
import Question1 from "./Question1";
import Question2Yes from "./Question2Yes";
import Question2No from "./Question2No";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import Question6 from "./Question6";
import FinalPage from "./FinalPage";

function HomePage() {
    const [responses, setResponses] = useState({
        currentStep: 1,
        answers: {}
    })

    const renderCurrentStep = () => {
        const {currentStep, answers } = responses;

        const handleResponse = (questionId, answer) => {
            setResponses(prev => ({
                currentStep: prev.currentStep + 1,
                answers: {
                    ...prev.answers,
                    [questionId]: answer
                }
            }))
        }

        switch (currentStep) {
            case 1:
                return <Question1 onResponse={(answer) => handleResponse('q1', answer)} />
            case 2:
                return answers.q1 === 'yes'
                ? <Question2Yes onResponse={(answer) => handleResponse('q2', answer)} />
                : <Question2No />
            case 3:
                return answers.q2 === 'yes'
                ? <Question3 onResponse={(answer) => handleResponse('q4', answer)} />
                : null
            case 4:
                return <Question4 onResponse={(answer) => handleResponse('q5', answer)} />
            case 5:
                return <Question5 onResponse={(answer) => handleResponse('q6', answer)} />
            case 6:
                return <Question6 onResponse={(answer) => handleResponse('q7', answer)} />
            case 7:
                return <FinalPage responses={responses} />
            default:
                return <Question1 onResponse={(answer) => handleResponse('q1', answer)} />
        }
    }

    return (
        <>
            {renderCurrentStep()}
        </>
    )
}

export default HomePage