'use client'

import { useState } from "react"
import Question1 from "./Question1";
import Question2Yes from "./Question2Yes";
import Question2No from "./Question2No";
import Question3 from "./Question3";
import Question4 from './Question4';
import Question5 from './Question5';
import Question6 from './Question6';
import FinalPage from "./FinalPage";

function PublicLovePage({ initialData }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [responses, setResponses] = useState({
        answers: {}
    })

    const handleResponse = async (answer) => {
        const newResponses = {
            answers: {
                ...responses.answers,
                [`q${currentStep}`]: answer
            }
        }
        setResponses(newResponses)

        const currentStepData = initialData.content.steps.find(s => s.id === currentStep)
        if (currentStepData.type === 'conditional') {
            if (currentStep === 1 && answer === 'no') {
                setCurrentStep(3);
                return;
            }
            if (currentStep === 2 && answer === 'yes') {
                setCurrentStep(4)
                return;
            }
        }
        
        setCurrentStep(prev => prev + 1);

        try {
            await fetch(`/api/love-page/response`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    slug: initialData.slug,
                    responses: newResponses
                })
            })
        } catch (error) {
            console.error("failed to save responses:", error)
        }
     }

    const renderCurrentStep = () => {
        const stepData = initialData.content.steps.find(s => s.id === currentStep)
        if (!stepData) return null;

        console.log('stepdata', stepData)

        switch (stepData.type) {
            case 'simple':
                return <Question1
                    onResponse={handleResponse}
                    title={stepData.title}
                    image={stepData.image}
                />
            case 'conditional':
                if (currentStep === 2) {
                    return responses.answers.q1 === 'yes'
                        ? <Question2Yes
                            onResponse={handleResponse}
                            title={stepData.title}
                            subtitle={stepData.subtitle}
                            image={stepData.image}
                        />
                        : <Question2No
                            image={stepData.image}
                        />
                }
                break;
            case 'calendar':
                return <Question3
                    onResponse={handleResponse}
                    title={stepData.title}
                    subtitle={stepData.subtitle}
                />
            case 'grid':
                const GridComponent = currentStep === 5 ? Question4 : currentStep === 6 ? Question5 : Question6;

                return <GridComponent onResponse={handleResponse} title={stepData.title} />
            case 'final':
                const sendFinalEmail = async () => {
                    console.log("sending final email.")
                    try {
                        await fetch(`/api/love-page/send-email`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                responses,
                                ownerId: initialData.userId
                            })
                        })
                        console.log('email sent successfuly!')
                    } catch (error) {
                        console.error('failed to send email:', error)
                    }
                }

                sendFinalEmail();

                return <FinalPage
                    responses={responses}
                    title={stepData.title}
                    image={stepData.image}
                />

            default:
                return null;
        }
    }
    return (
        <div className="container mx-auto py-8">
            {renderCurrentStep()}
        </div>
    )
}

export default PublicLovePage