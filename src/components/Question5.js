'use client'

import { useState } from "react"
import { Button } from "./ui/button";

function Question5({ onResponse, title }) {
    const [selectedDessert, setSelectedDessert] = useState(null);

    const handleContinue = () => {
        if (selectedDessert) {
            onResponse(selectedDessert)
        }
    }

    const desserts = [
        { id: 'che', name: 'Che', display: 'che' },
        { id: 'churro', name: 'Churro', display: 'churro' },
        { id: 'mochi', name: 'Mochi', display: 'mochi' },
        { id: 'taiyaki', name: 'Taiyaki', display: 'taiyaki' },
        { id: 'cheesecake', name: 'Cheesecake', display: 'cheesecake' },
        { id: 'boba', name: 'Boba', display: 'boba' }
    ]

    return (
        <div className="text-center">
            <h1 className="text-5xl font-bold text-brand tracking-wide">
             {title || "Which dessert are we eating?"}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto">
                {desserts.map(dessert => (
                    <div
                        key={dessert.id}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setSelectedDessert(dessert.id)}
                    >
                        <img
                            src={`/dessert/${dessert.id}.png`}
                            alt={dessert.name}
                            className={`rounded-xl w-full h-48 object-cover ${selectedDessert === dessert.id ? 'ring-4 ring-brand' : ''}`}
                        />
                        <p className="mt-2 font-semibold">{dessert.display}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center mt-8">
                <Button
                    size='lg'
                    className={`${!selectedDessert ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!selectedDessert}
                    onClick={handleContinue}
                >
                    Continue UWU
                </Button>
            </div>
        </div>
    )
}

export default Question5