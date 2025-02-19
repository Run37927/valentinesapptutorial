'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"
import EditableQuestionOne from "./EditableQuestions/EditableQuestionOne"
import EditableQuestionTwo from "./EditableQuestions/EditableQuestionTwo"
import EditableQuestionThree from "./EditableQuestions/EditableQuestionThree"
import EditableQuestionFour from "./EditableQuestions/EditableQuestionFour"
import EditableQuestionFive from "./EditableQuestions/EditableQuestionFive"
import EditableQuestionSix from "./EditableQuestions/EditableQuestionSix"
import EditableQuestionSeven from "./EditableQuestions/EditableQuestionSeven"
import EditableFinalQuestion from "./EditableQuestions/EditableFinalQuestion"

function EditableQuiz({ pageSlug }) {
    const { data: lovePage, isPending } = useQuery({
        queryKey: ['love-page', pageSlug],
        queryFn: async () => {
            const { data } = await axios.get(`/api/love-page?slug=${pageSlug}`)
            return data;
        },
        enabled: !!pageSlug
    })

    if (isPending) return (
        <div className="flex items-center justify-center">
            <Loader2 className="size-6 animate-spin" />
        </div>
    )

    const renderCurrentStep = () => {
        const currentStep = lovePage?.content?.settings.currentStep;
        console.log("currentstep", currentStep)

        const stepData = lovePage.content.steps.find(step => step.id === currentStep)

        switch(currentStep) {
            case 1:
                return <EditableQuestionOne pageSlug={pageSlug} stepData={stepData} />
            case 2:
                return <EditableQuestionTwo pageSlug={pageSlug} stepData={stepData} />
            case 3:
                return <EditableQuestionThree pageSlug={pageSlug} stepData={stepData} />
            case 4:
                return <EditableQuestionFour pageSlug={pageSlug} stepData={stepData} />
            case 5:
                return <EditableQuestionFive pageSlug={pageSlug} stepData={stepData} />
            case 6:
                return <EditableQuestionSix pageSlug={pageSlug} stepData={stepData} />
            case 7:
                return <EditableQuestionSeven pageSlug={pageSlug} stepData={stepData} />
            case 8:
                return <EditableFinalQuestion pageSlug={pageSlug} stepData={stepData} />
        }
    }

    return (
        <div>
            {renderCurrentStep()}
        </div>
    )
}

export default EditableQuiz