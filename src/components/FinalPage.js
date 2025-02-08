import React from 'react'

function FinalPage() {
  return (
    <div className='text-center'>
        <h1 className='text-5xl font-bold text-brand tracking-wide whitespace-pre-line'>
            {`Thank you for being my girlfriend\n(づ ◕‿◕ )づ`}
        </h1>

        <div className='flex relative items-center justify-center mt-20'>
            <div className='-m-2 rounded-xl w-1/2 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                <img src="/final.gif" alt="final" className='w-full rounded-xl' />
            </div>
        </div>
    </div>
  )
}

export default FinalPage