'use client'

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react"
import { Modal } from "./ui/modal";
import { CheckIcon, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

function PaymentSuccessModal({ userId }) {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            slug: ""
        }
    })

    const { data, isPending } = useQuery({
        queryKey: ["user-plan"],
        queryFn: async () => {
            const { data } = await axios.get("/api/user-plan", { params: { userId } });
            return data;
        },
        refetchInterval: (query) => {
            return query.state.data?.isPaid ? false : 1000
        }
    })

    const isPaymentSuccessful = data?.isPaid;
    
    const {mutate: createLovePage, isPending: isCreatingLovePage} = useMutation({
        mutationFn: async ({ slug }) => {
            const {data} = await axios.post("/api/love-page/create", {userId, slug});
            return data;
        },
        onSuccess: (data) => {
            toast.success("✅ Page created!", {
                description: "Redirecting to editor..."
            });
            router.push(`/editor/${data.slug}`)
        },
        onError: (error) => {
            console.log("error", error.response.data);
            toast.error(" error creating page", {
                description: `${error.response?.data?.error || 'please try again'}`
            })
        }
    })
    const onSubmit = (data) => {
        const payload = {
            slug: data.slug
        }
        createLovePage(payload)
    }
    return (
        <Modal
            showModal={isOpen}
            setShowModal={setIsOpen}
            className="px-6 pt-6"
            preventDefaultClose={!isPaymentSuccessful}
        >
            <div className="flex flex-col items-center">
                {isPending || !isPaymentSuccessful ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <Loader2 className="size-4 mb-4 animate-spin" />
                        <p className="text-lg/7 font-medium text-gray-900">
                            Upgrading your account...
                        </p>
                        <p className="text-sm/6 text-center text-gray-600 mt-2">
                            Please wait while we process your upgrade. This may take a moment.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mt-6 flex flex-col items-center gap-1 text-center">
                            <p className="text-xl/7 font-bold tracking-tight text-pretty">
                                Upgrade successful 🎉
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm text-gray-900 text-center">
                                    Choose a unique name for your page
                                </label>
                                <Input
                                    autoFocus
                                    placeholder="e.g., jenny"
                                    className="w-full placeholder:text-gray-400"
                                    {...register("slug", {
                                        required: {
                                            value: true,
                                            message: "Name is required"
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z]+$/,
                                            message: "Only letters are allowed"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "name must be at least 3 chars"
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "name must be less than 20 chars"
                                        }
                                    })}
                                />
                                {errors.slug && (
                                    <p className="text-red-500 text-sm">{errors.slug.message}</p>
                                )}
                                <p className="text-xs text-gray-500">
                                    Your page will be available at: canyougooutwith.me/[name]
                                </p>

                                <Button
                                    className='h-12 w-full mt-6'
                                    type="submit"
                                    disabled={isCreatingLovePage}
                                >
                                    <CheckIcon className="size-4 mr-2" /> Start Creating
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </Modal>
    )
}

export default PaymentSuccessModal