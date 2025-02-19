import React from 'react'
import { Button } from './ui/button'

function Question2Yes({ onResponse, title, subtitle, image }) {
  return (
    <div className='text-center'>
      <h1 className='text-5xl font-bold text-brand tracking-wide'>
        {title || " Thank you 🌹"}
      </h1>

      <div className='flex relative items-center justify-center mt-10'>
        <div className='-m-2 rounded-xl w-1/2 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
          {image ? (
            <img src={image.src} alt={image.alt} className='w-full rounded-xl' />
          ) : (
            <img src="/rizz.gif" alt="rizz" className='w-full rounded-xl' />
          )}
        </div>
      </div>

      <h2 className='text-xl font-bold text-brand tracking-wide mt-10'>
        {subtitle || "Don't go yet..."}
      </h2>

      <div className='flex items-center justify-center mt-4'>
        <Button
          size='lg'
          onClick={() => onResponse('yes')}
        >
          Click me UWU
        </Button>
      </div>
    </div>
  )
}

export default Question2Yes