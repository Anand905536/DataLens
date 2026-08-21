import React from 'react'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { FaPlus } from "react-icons/fa6";
import { IoArrowUp } from 'react-icons/io5'

const Main = () => {
  const [chat, setChat] = useState([])
  const [text, setText] = useState("")
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)


  const ask_api_call = async () => {
    if (!text.trim()) return;
    const currentText = text;
    setText("")
    // console.log("api called")
    try {
      const res = await axios.post('http://127.0.0.1:8000/ask', null, {
        params: {
          question: currentText
        },
        headers: {
          "Accept": 'application/json'
        }
      })
      // console.log(res.data.answer.answer)
      const question = res.data.answer.question
      const answer = res.data.answer.answer
      setChat(prev => [...prev, { text: question, sender: 'user' },
      { text: answer, sender: 'ai' }])
    } catch (err) {
      console.error("error occured", err)
    }
  }


  // const handle_Upload = async () => {

  // }

  // useEffect(() => {

  // }, [])


  return (
    <>
      <div className=' flex justify-end'>
        <button className='rounded-md w-30 py-2 
        mt-2 mr-2 text-sm flex 
        items-center justify-evenly bg-red-600 hover:cursor-pointer hover:bg-red-500'>
          Log out</button>
      </div>
      <div className=' w-full flex justify-center'>
        <div className='chat-section  w-[650px]
         overflow-y-auto h-110 pt-0.5'>
          <div className='gap-3'>
            {
              chat.length > 0 ?
                (
                  chat.map((msg, idx) => (
                    <div className={`flex items-center w-full max-w-2xl ${msg.sender === 'user' ? 'bg-gray-600 ml-auto' : 'bg-[#171717]'}
                    space-x-2 bg-[#171717] mr-auto rounded-3xl px-4 py-4 mb-3`}
                      key={idx}>
                      <p className='w-full break-words whitespace-pre-wrap'>{msg.text}</p>
                    </div>
                  ))
                )
                : (<h2 className='text-4xl'>Welcome Anand</h2>)
            }
          </div>
        </div>
        <br />
        <div className="fixed bottom-5 right-43 flex items-center w-full
         max-w-2xl space-x-2 bg-[#171717]
          rounded-full px-4 py-2">

          <button className="text-gray-300 hover:text-gray-500
           text-xl hover:cursor-pointer
           " onClick={() => fileInputRef.current.click()}>
            <FaPlus />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            className='hidden'
            onChange={(e) => setFile(e.target.files[0])}
          />


          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask Me......"
            className="flex-grow rounded-full px-4 py-2 outline-none focus:ring-0 bg-[#171717] text-white"
          />

          <button className="text-white bg-green-500 hover:bg-gray-500 hover:cursor-pointer rounded-full p-2" onClick={ask_api_call}>
            <IoArrowUp />
          </button>
        </div>

      </div>
    </>

  )
}

export default Main