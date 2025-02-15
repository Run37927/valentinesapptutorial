'use client'
import { Heart, Lock } from 'lucide-react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const INCLUDED_FEATURES = [
    "Upload your own gifs/images",
    "Receive answers in your email",
    "Unique link for your person",
    "Customize the questions"
]
function Pricing() {
    const router = useRouter();

    const handlePurchase = () => {
        router.push('/sign-in?intent=purchase');
        return;
    }
    return (
        <div className='min-h-screen py-24 sm:pb-32'>
            <MaxWidthWrapper>
                <div className='mx-auto sm:text-center'>
                    <h1 className='text-4xl sm:text-5xl text-pretty text-center font-bold text-brand'>
                        Surprise Your Special Someone
                    </h1>
                    <div className='max-w-prose mx-auto mt-6'>
                        <p className='text-base/8 text-gray-600 text-center text-pretty'>
                            Got someone speciail on your mind? Make it easier (and way more fun) to figure out your Valentine's plans. Create a custom quiz with cute, playful questions to ask them where they want to go, what they want to eat, and what comes next. Throw in some meme-worthy gifs for extra charm and make this Valentine's one they'll never forget. 💖
                        </p>
                    </div>
                </div>

                <div className='mx-auto mt-12 aspect-video w-full max-w-3xl'>
                    <iframe
                        src="https://www.youtube.com/embed/VQOCG1eHhc8"
                        title='Product demo video'
                        className='w-full h-full rounded-2xl'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    />
                </div>

                <div className='bg-white mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'>
                    <div className='p-8 sm:p-10 lg:flex-auto'>
                        <h3 className='text-3xl font-semibold tracking-tight text-gray-900'>
                            One-time Purchase, Lifetime Love
                        </h3>

                        <p className='mt-6 text-base/7 text-gray-600'>
                            Make this Valentine's one to remember by creating a unique quiz for your special someone. Take the guesswork out of planning the perfect date!
                        </p>

                        <div className='flex mt-10 items-center gap-x-4'>
                            <h4>
                                What&apos;s included
                            </h4>
                            <div className='h-px flex-auto bg-gray-100' />
                        </div>

                        <ul className='mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-600 sm:grid-cols-2 sm:gap-6'>
                            {INCLUDED_FEATURES.map(feature => (
                                <li key={feature} className='flex gap-3'>
                                    <Heart className='size-6 flex-none fill-brand text-brand' />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='p-2 -mt-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0'>
                        <div className='rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16'>
                            <div className='mx-auto max-w-xs py-8'>
                                <p className='text-base font-semibold text-gray-600'>
                                    One-time payment
                                </p>
                                <p className='flex items-baseline mt-6 justify-center gap-x-2'>
                                    <span className='text-5xl font-bold tracking-tight text-gray-900'>$9.99</span>
                                    <span className='text-sm font-semibold leading-6 tracking-wide text-gray-600'>CAD</span>
                                </p>

                                <Button
                                    size='lg'
                                    className='mt-6 px-20 py-8 text-lg font-semibold'
                                    onClick={() => handlePurchase()}
                                >
                                    Create Now
                                </Button>

                                <p className='flex items-center justify-center gap-x-1.5 select-none mt-6 text-xs leading-5 text-gray-600'>
                                    <span>
                                        <Lock className='size-4' />
                                    </span>
                                    Secure payment via Stripe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default Pricing