import { useState } from "react"
import { Button } from "./ui/button"

function Question4({ onResponse }) {
    const [selectedFood, setSelectedFood] = useState(null)

    const foods = [
        { id: 'hotdog', name: 'Hot Dog', display: 'hot dog' },
        { id: 'sushi', name: 'Sushi', display: 'sushi' },
        { id: 'korean', name: 'Korean Food', display: 'Korean' },
        { id: 'pasta', name: 'Pasta', display: 'Pasta' },
        { id: 'pizza', name: 'Pizza', display: 'Pizza' },
        { id: 'steak', name: 'Steak', display: 'Steak' },
        { id: 'poke', name: 'Poke', display: 'Poke' },
        { id: 'pho', name: 'Pho', display: 'Pho' },
        { id: 'hotpot', name: 'Hotpot', display: 'Hotpot' }
    ]

    const handleContinue = () => {
        if (selectedFood) {
            onResponse(selectedFood)
        }
    }
    return (
        <div className="text-center">
            <h1 className="text-5xl font-bold text-brand tracking-wide">
                What food would you like to eat? 🍽️
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10 max-w-2xl mx-auto">
                {foods.map(food => (
                    <div
                        key={food.id}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setSelectedFood(food.id)}
                    >
                        <img
                            src={`/food/${food.id}.png`}
                            alt={food.name}
                            className={`rounded-xl w-full h-48 object-cover ${selectedFood === food.id ? 'ring-4 ring-brand' : ""}`}
                        />
                        <p className="mt-2 font-semibold">{food.display}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center mt-8">
                <Button
                    size='lg'
                    className={`text-brand ${!selectedFood ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleContinue}
                    disabled={!selectedFood}
                >
                    Continue UWU
                </Button>
            </div>
        </div>
    )
}

export default Question4