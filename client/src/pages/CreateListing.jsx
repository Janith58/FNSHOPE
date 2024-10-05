import React from 'react'

const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a new listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className='flex flex-col gap-4 flex-1 '>
          <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' required/>
          <textarea type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required/>
          <input type='number' placeholder='price' className='border p-3 rounded-lg' id='price' required/>
          <input type='number' placeholder='Count in stock' className='border p-3 rounded-lg' id='quintity' required/>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          </p>
          <div className='flex gap-4'>
            <input type="file" id="images" className="border p-3 rounded w-full border-gray-300" accept='image/*' multiple />
            <button className='p-3 text-green-900 border border-green-900 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
          <button className='p-3 bg-green-700 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-80'>Create listing</button>
        </div> 
      </form>
    </main>
  )
}

export default CreateListing
