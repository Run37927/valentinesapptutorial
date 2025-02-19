function Question2No({ image }) {
  return (
    <div className='text-center'>
      <div className='flex relative items-center justify-center mt-20'>
        <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
          {image ? (
            <img src={image.src} alt={image.alt} className="w-full rounded-xl" />
          ) : (
            <img src="/sad.gif" alt="sad" className='w-full rounded-xl' />
          )}
        </div>
      </div>
    </div>
  )
}

export default Question2No