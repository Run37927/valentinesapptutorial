import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { Check, ImagePlus, Loader2, Pencil } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

function EditableQuestionOne({ pageSlug, stepData }) {
    const queryClient = useQueryClient();
    const [preview, setPreview] = useState(null);

    const { register, handleSubmit, reset, watch, formState: { errors, isDirty } } = useForm({
        defaultValues: {
            title: stepData.title || "",
            imageFile: null,
        }
    })

    const selectedImageFile = watch("imageFile");
    const imageFileType = selectedImageFile?.[0]?.type.split("/")[0]

    // look at changes of the image file and set the preview
    useEffect(() => {
        if (selectedImageFile?.[0]) {
            if (imageFileType === "image") {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result)
                }
                reader.readAsDataURL(selectedImageFile?.[0])
            } else {
                setPreview(null)
            }
        }
    }, [selectedImageFile])

    // mutation to save the edits
    const { mutate: saveQuestion, isPending } = useMutation({
        mutationFn: async ({ title, imageFile }) => {
            let fileUrl = stepData.image.src;

            if (imageFile) {
                const formData = new FormData();
                formData.append("imageFile", imageFile);

                const uploadResponse = await axios.post(`/api/s3-upload`, formData);
                fileUrl = uploadResponse.data.fileUrl;
            }

            const { data } = await axios.patch(`/api/love-page/update?slug=${pageSlug}`, {
                stepId: 1,
                updates: {
                    title,
                    image: {
                        src: fileUrl,
                        alt: 'image'
                    }
                }
            })
            return data;
        },
        onSuccess: (data) => {
            toast.success("✅ Changes saved", {
                description: "Your changes have been saved succesfully"
            });
            queryClient.invalidateQueries({ queryKey: ['love-page', pageSlug] })
            reset({
                title: data.content.steps[0].title,
                imageFile: null
            })
            setPreview(null)
        },
        onError: (error) => {
            console.log("error saving question", error.response.data)
            toast.error("Something went wrong", {
                description: "please try again later"
            })
        }
    })

    // mutation to go to the next step
    const { mutate: goToNextStep } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.patch(`/api/love-page/update?slug=${pageSlug}`, {
                updateSettings: true,
                updates: {
                    settings: {
                        currentStep: 2
                    }
                }
            })
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['love-page', pageSlug] })
        }
    })

    const onSubmit = (data) => {
        const payload = {
            title: data.title,
            imageFile: data.imageFile?.[0]
        }

        saveQuestion(payload)
    }
    return (
        <div className="text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-8">
                    <div className="relative mx-auto w-fit flex-1">
                        <Input
                            {...register("title", { required: { value: true, message: "this is required" } })}
                            className="text-5xl font-bold text-brand tracking-wide text-center rounded-xl !border-dashed !border-2 !border-brand/30 hover:!border-brand/60 focus:!border-brand min-w-[600px] p-8 pr-16"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        <Pencil className="size-6 text-brand/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="flex items-center">
                        <Button
                            type="submit"
                            variant="outline"
                            size="icon"
                            className={`transition-opacity ${isDirty ? 'opacity-100' : "opacity-0"}`}
                        >
                            {isPending ? <Loader2 className="size-6 animate-spin text-gray-500"/> : <Check className="size-6 text-green-500" />}
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6">
                    {stepData.options.map((option) => (
                        <div key={option.id} className="group relative">
                            <Button
                                size='lg'
                            >
                                {option.text}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="flex relative items-center justify-center mt-10">
                    <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        <label
                            htmlFor="imageFile"
                            className="relative group cursor-pointer block"
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className={`w-full h-full rounded-xl transition-all duration-200 group-hover:brightness-50 ${isPending ? "brightness-50" : ""}`}
                                />
                            ) : (
                                <img
                                    src={stepData.image.src || "/please.gif"}
                                    alt={stepData.image.alt || "please"}
                                    className={`w-full rounded-xl transition-all duration-200 group-hover:brightness-50 ${isPending ? "brightness-50" : ""}`}
                                />
                            )}

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full">
                                    <ImagePlus className="size-6 text-white" />
                                </div>
                            </div>

                            {isPending && <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="size-6 animate-spin text-white" />
                            </div>}

                            <input
                                id="imageFile"
                                type="file"
                                name="imageFile"
                                className="hidden"
                                accept="image/*"
                                {...register("imageFile", {
                                    onChange: (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            handleSubmit(onSubmit)();
                                        }
                                    }
                                })}
                                aria-label="upload image file"
                            />
                        </label>
                    </div>
                </div>
            </form>

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

export default EditableQuestionOne