'use client'
import React, { useEffect } from 'react'
import { Button, buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

function FinalPage({ responses, title, image }) {
    const router = useRouter();

    useEffect(() => {
        if (!title && !image) {
            const timeout = setTimeout(() => {
                const { answers } = responses;
                const formattedDate = new Date(answers.q4).toLocaleDateString();

                const message = `Response:
    Q1: ${answers.q1}
    Q2: ${answers.q2}
    Q3: ${formattedDate}
    Q4: ${answers.q5}
    Q5: ${answers.q6}
    Q6: ${answers.q7}`;

                alert(message)
            }, 500)

            return () => clearTimeout(timeout)
        }
    }, [responses, title, image])

    return (
        <div className='text-center'>
            <h1 className='text-5xl font-bold text-brand tracking-wide whitespace-pre-line'>
                {title || `Thank you for being my girlfriend\n(づ ◕‿◕ )づ`}
            </h1>

            <div className='flex relative items-center justify-center mt-20'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                    {image ? (
                        <img src={image.src} alt={image.alt} className='w-full rounded-xl' />
                    ) : (
                        <img src="/final.gif" alt="final" className='w-full rounded-xl' />
                    )}
                </div>
            </div>

            {title && image ? null : (
                <>
                    <h2 className='text-2xl font-bold text-brand tracking-wide mt-20'>
                        Surprise her
                    </h2>

                    <Button
                        size='lg'
                        className='mt-4 group relative animate-pulse-ring py-6'
                        onClick={() => router.push('/pricing')}
                    >
                        <span className='text-xl'>Create Your Own</span>
                        <ArrowRight className='size-4 ml-2 group-hover:translate-x-1 transition-transform' />
                    </Button>

                    <div className='w-fit mx-auto mt-12'>
                        <div className='relative'>
                            <div className='absolute inset-0 flex items-center'>
                                <div className='w-full border-t border-gray-200' />
                            </div>
                            <div className='relative flex justify-center text-xs'>
                                <span className='bg-white px-2 text-gray-500'>
                                    OR
                                </span>
                            </div>
                        </div>

                        <Link
                            href='/sign-in'
                            className={cn(buttonVariants({ size: 'lg' }), "mt-4 flex items-center justify-center px-4 py-5")}
                        >
                            <span className='text-brand'>Sign in</span>
                        </Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default FinalPage