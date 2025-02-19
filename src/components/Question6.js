'use client'

import { useState } from "react"
import { Button } from "./ui/button";

function Question6({ onResponse, title }) {
    const [selectedActivity, setSelectedActivity] = useState(null);

    const handleContinue = () => {
        if (selectedActivity) {
            onResponse(selectedActivity)
        }
    }

    const activities = [
        { id: 'arcade', name: 'Arcade', display: 'Arcade' },
        { id: 'cinema', name: 'Cinema', display: 'Cinema' },
        { id: 'park', name: 'Park', display: 'Park' },
        { id: 'museum', name: 'Museum', display: 'Museum' },
        { id: 'ceramics', name: 'Ceramics', display: 'Ceramics' },
        { id: 'gallery', name: 'Art Gallery', display: 'Art Gallery' },
        { id: 'aquarium', name: 'Aquarium', display: 'Aquarium' },
        { id: 'mall', name: 'Mall', display: 'Mall' },
        { id: 'karaoke', name: 'Karaoke', display: 'Karaoke' }
    ]
    return (
        <div className="text-center">
            <h1 className="text-5xl font-bold text-brand tracking-wide">
                {title || "What would you like to do after?"}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto">
                {activities.map(activity => (
                    <div
                        key={activity.id}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setSelectedActivity(activity.id)}
                    >
                        <img
                            src={`/place/${activity.id}.png`}
                            alt={activity.name}
                            className={`rounded-xl w-full h-48 object-cover ${selectedActivity === activity.id ? 'ring-4 ring-brand' : ''}`}
                        />
                        <p className="mt-2 font-semibold">{activity.display}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center mt-8">
                <Button
                    size='lg'
                    className={`${!selectedActivity ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!selectedActivity}
                    onClick={handleContinue}
                >
                    Continue UWU
                </Button>
            </div>
        </div>
    )
}

export default Question6