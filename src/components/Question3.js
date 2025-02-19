'use client'
import React, { useState } from 'react'
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';

function Question3({ onResponse, title, subtitle }) {
    const [date, setDate] = useState(null);

    return (
        <div className='text-center'>
            <h1 className='text-5xl font-bold text-brand tracking-wide'>
               {title || "Are you free on..."}
            </h1>

            <h2 className='text-xl font-bold text-brand tracking-wide mt-10'>
               {subtitle || "Select a date"}
            </h2>

            <div className='flex items-center justify-center gap-4 mt-4'>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />

                <Button
                    size="lg"
                    disabled={!date}
                    onClick={() => {
                        console.log(date)
                        onResponse(date)
                    }}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default Question3