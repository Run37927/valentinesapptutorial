import { Button } from "./ui/button"

function Question1({ onResponse, title, image }) {
    return (
        <div className="text-center">
            <h1 className="text-5xl font-bold text-brand tracking-wide">
                {title || "Will you be my valentine?"}
            </h1>

            <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                    size='lg'
                    onClick={() => onResponse('yes')}
                >
                    Yes
                </Button>
                <Button
                    size='lg'
                    onClick={() => onResponse('no')}
                >
                    I no no wanna .·°՞(≧□≦)՞°·.
                </Button>
            </div>

            <div className="flex relative items-center justify-center mt-10">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                {image ? (
                    <img src={image.src} alt={image.alt} className="w-full rounded-xl" />
                ): (
                    <img src="/please.gif" alt="please" className="w-full rounded-xl" />
                )}
                </div>
            </div>
        </div>
    )
}

export default Question1