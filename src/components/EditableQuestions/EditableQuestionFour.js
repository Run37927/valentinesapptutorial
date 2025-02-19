'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import { Input } from "../ui/input";
import { Check, Loader2, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

function EditableQuestionFour({ pageSlug, stepData }) {
    const [date, setDate] = useState(null);
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { isDirty, errors } } = useForm({
        defaultValues: {
            title: stepData.title || "",
        }
    })

    const { mutate: saveQuestion, isPending } = useMutation({
        mutationFn: async ({ title }) => {
            const { data } = await axios.patch(`/api/love-page/update?slug=${pageSlug}`, {
                stepId: 4,
                updates: { title }
            })
            return data;
        },
        onSuccess: (data) => {
            toast.success("✅ Changes saved", {
                description: "Your changes have been saved succesfully"
            });
            queryClient.invalidateQueries({ queryKey: ['love-page', pageSlug] })
            reset({
                title: data.content.steps.find(s => s.id === 4).title
            })
        }
    })

    const { mutate: goToNextStep } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.patch(`/api/love-page/update?slug=${pageSlug}`, {
                updateSettings: true,
                updates: {
                    settings: {
                        currentStep: 5
                    }
                }
            })
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['love-page', pageSlug],
            })
        }
    })


    const onSubmit = (formData) => {
        const payload = {
            title: formData.title,
        }

        saveQuestion(payload)
    }


    return (
        <div className="text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-8">
                    <div className="relative mx-auto w-fit flex-1">
                        <Input
                            {...register('title', { required: { value: true, message: "thsi is required" } })}
                            className="text-5xl font-bold text-brand tracking-wide text-center rounded-xl !border-dashed !border-2 !border-brand/30 hover:!border-brand/60 focus:!border-brand min-w-[600px] p-8 pr-16"
                        />
                        <Pencil className="size-6 text-brand/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div className="flex items-center">
                        <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            className={`transition-opacity ${isDirty ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {isPending ? <Loader2 className="size-6 animate-spin text-gray-500" /> : <Check className="size-6 text-green-500" />}
                        </Button>
                    </div>
                </div>

                <div className="relative mx-auto w-fit flex-1 mt-10">
                    <p className="text-xl font-bold text-brand tracking-wide text-center">
                        {stepData.subtitle}
                    </p>
                </div>
            </form>

            <div className="flex items-center justify-center gap-4 mt-4">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />

                <Button
                    size='lg'
                    disabled={!date}
                >
                    Submit
                </Button>
            </div>

            <Button
                variant="outline"
                size="lg"
                className="mt-20"
                onClick={() => goToNextStep()}
            >
                Next Step
            </Button>
        </div>
    )
}

export default EditableQuestionFour