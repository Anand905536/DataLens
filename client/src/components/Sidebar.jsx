import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Drawer from './Drawer.jsx'
import { Spinner } from "@/components/ui/spinner";
import axios from 'axios'

const Sidebar = ({chatId,allChats,separateChat}) => {

  return (
    <div className='w-[230px] flex flex-col mt-6'  >
      <div className='h-15'>
        <h1 className='tracking-wider text-3xl'>Datalens 🪢</h1>
      </div>

      <div className=' h-15 w-[200px] flex flex justify-between items-center'>
        <button className='  h-8 w-[95px] rounded-md text-sm flex items-center 
        justify-evenly bg-green-600 hover:bg-green-500 hover:cursor-pointer '>
          <FaPlus /><p className='font-medium'>New Chat</p></button>
        <Drawer />
      </div>
      <div className='h-7 tracking-wider text-gray-500 font-semibold'>
        Recent Chats
      </div>
      <hr className='border-gray-500' />
      <div className=' mt-4'>
        {
          allChats.length > 0 ? allChats.map((data, idx) => {
            return <div key={idx} onClick={() => separateChat(data)} className='hover:bg-[#212121] hover:cursor-pointer tracking-wider
           flex items-center rounded-[7px] pl-1 text-gray-300 h-8 text-sm font-semibold'>
              {data.length > 20 ? `${data.title.slice(0, 20)}` : data.title}
            </div>
          })
            :
            <div className=' h-20 flex justify-center mt-5'>
              <Spinner className="h-6 w-6 mt- text-gray-500" />
            </div>
        }
      </div>
    </div>
  )
}

export default Sidebar