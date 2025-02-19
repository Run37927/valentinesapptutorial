'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImagePlus, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from "sonner"
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import axios from 'axios';


function EditableQuestionThree({ pageSlug, stepData }) {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, watch, formState: { isDirty, errors } } = useForm({
        defaultValues: {
            imageFile: null,
        }
    })

    const selectedImageFile = watch("imageFile");
    const imageFileType = selectedImageFile?.[0]?.type.split("/")[0];
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (selectedImageFile?.[0]) {
            if (imageFileType === 'image') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                }
                reader.readAsDataURL(selectedImageFile?.[0])
            } else {
                setPreview(null);
            }
        }
    }, [selectedImageFile])

    const { mutate: saveQuestion, isPending } = useMutation({
        mutationFn: async ({ imageFile }) => {
            let fileUrl = stepData.image.src;

            if (imageFile) {
                const formData = new FormData();
                formData.append("imageFile", imageFile);

                const uploadResponse = await axios.post(`/api/s3-upload`, formData)
                fileUrl = uploadResponse.data.fileUrl;
            }

            const { data } = await axios.patch(`/api/love-page/update?slug=${pageSlug}`, {
                stepId: 3,
                updates: {
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
            queryClient.invalidateQueries({ queryKey: ['love-page'], pageSlug })
            reset({
                imageFile: null
            })
            setPreview(null)
        },
        onError: (error) => {
            console.log("erro saving question", error.response.data);
            toast.error("Something went wrong", {
                description: "please try again later"
            })
        }
    })

    const { mutate: goToNextStep } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.patch(`/api/love-page/update?slug=${pageSlug}`, {
                updateSettings: true,
                updates: {
                    settings: {
                        currentStep: 4
                    }
                }
            })
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['love-page', pageSlug]
            })
        }
    })

    const onSubmit = (data) => {
        const payload = {
            imageFile: data.imageFile?.[0]
        }
        saveQuestion(payload)
    }

    return (
        <div className="text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    src={stepData.image.src || "/sad.gif"}
                    alt={stepData.image.alt || "sad"}
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

export default EditableQuestionThree