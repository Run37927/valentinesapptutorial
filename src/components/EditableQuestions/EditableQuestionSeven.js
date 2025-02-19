'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Check, Loader2, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner"

function EditableQuestionSeven({ pageSlug, stepData }) {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { isDirty, errors } } = useForm({
        defaultValues: {
            title: stepData.title || "",
        }
    })

    const { mutate: saveQuestion, isPending } = useMutation({
        mutationFn: async ({ title }) => {
            const { data } = await axios.patch(`/api/love-page/update?slug=${pageSlug}`, {
                stepId: 7,
                updates: { title }
            })
            return data
        },
        onSuccess: (data) => {
            toast.success("✅ Changes saved", {
                description: "Your changes have been saved succesfully"
            });
            queryClient.invalidateQueries({ queryKey: ['love-page', pageSlug] })
            reset({
                title: data.content.steps.find(s => s.id === 7).title,
            })
        }
    })

    const { mutate: goToNextStep } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.patch(`/api/love-page/update?slug=${pageSlug}`, {
                updateSettings: true,
                updates: {
                    settings: {
                        currentStep: 8
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
                            {...register("title", { required: { value: true, message: "This is required" } })}
                            className="text-5xl font-bold text-brand tracking-wide text-center rounded-xl !border-dashed !border-2 !border-brand/30 hover:!border-brand/60 focus:!border-brand min-w-[600px] py-8 px-6 pr-16"
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
            </form>

            <div className="grid grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto">
                {stepData.options.map((option) => (
                    <div key={option.id} className="cursor-not-allowed">
                        <img
                            src={option.image}
                            alt={option.text}
                            className="rounded-xl w-full h-48 object-cover"
                        />
                        <p className="mt-2 font-semibold">{option.text}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center mt-8">
                <Button
                    size="lg"
                    className="text-brand"
                >
                    {stepData.buttonText}
                </Button>
            </div>

            <Button
                variant="outline"
                onClick={() => goToNextStep()}
                className="mt-12 group text-brand"
                size="lg"
            >
                Next Step
            </Button>
        </div>
    )
}

export default EditableQuestionSeven