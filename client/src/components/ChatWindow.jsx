import React from 'react'
import { useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import { IoArrowUp } from 'react-icons/io5'

const Main = () => {
  const [chat, setChat] = useState([

  ])
  console.log(chat.length)

  return (
    <>
      <div className=' flex justify-end'>
        <button className='rounded-md w-30 py-2 mt-2 mr-2 text-sm flex items-center justify-evenly bg-red-600'>
          Log out</button>
      </div>
      <div className='flex flex-col items-center justify-center
      h-full w-full  '>
        <div>
          {
            chat.length > 0 ?
              (<div>chat window</div>)
              : (<h2 className='text-4xl'>Welcome Anand</h2>)
          }
        </div>
        <br />
        <div className="flex items-center w-full max-w-2xl space-x-2 bg-[#171717] rounded-full px-4 py-2">
          <button className="text-gray-300 hover:text-gray-500 text-xl">
            <FaUpload />
          </button>

          <input
            type="text"
            placeholder="Ask Me......"
            className="flex-grow rounded-full px-4 py-2 outline-none focus:ring-0 bg-[#171717] text-white"
          />

          <button className="text-white bg-green-500 hover:bg-gray-500 rounded-full p-2">
            <IoArrowUp />
          </button>
        </div>

      </div>
    </>

  )
}

export default Main