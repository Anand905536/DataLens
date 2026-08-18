import React from 'react'
import {FaPlus} from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className='w-[200px] flex flex-col mt-6'  >
      <div className='h-15'>
        <h1 className=' text-3xl'>Datalens 🪢</h1>
      </div>

      <div className=' h-15'>
        <button className='rounded-md w-30 py-2 text-sm flex items-center justify-evenly bg-green-600'>
          <FaPlus/>New Chat</button>
      </div>
      <div className='flex-1 text-gray-500'>
        Recent Chat
      </div>
    </div>
  )
}

export default Sidebar