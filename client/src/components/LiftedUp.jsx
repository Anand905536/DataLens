import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Main from './ChatWindow'
import axios from 'axios'

const LiftedUp = () => {
  const [allChats, setAllChats] = useState([]);
  const [chatId, setChatId] = useState("")
  const [chat, setChat] = useState([])
  const [text, setText] = useState("")
  const [bool,setBool]=useState(false)


  const fetchChatById = async () => {
    if (!chatId) return
    try {
      const res = await axios.get(`http://127.0.0.1:8000/chats/${chatId}`, {
        params: {
          user_id: 'aditya98'
        },
        headers: {
          accept: 'application/json'
        }
      })
      setChat(res.data.messages)
    }
    catch (err) {
      console.error("'API Error", err)
    }
  }

  const separateChat = (data) => {
    setChatId(data.chat_id);
  };

  useEffect(() => {
    if (chatId) {
      fetchChatById();
      setBool(false)
    }
  }, [chatId,bool]);


  const get_all_chats = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/chats', {
        params: {
          user_id: 'aditya98',
          page: 1,
          limit: 10
        },
        headers: {
          accept: 'application/json'
        }
      });
      setAllChats(res.data)
    }
    catch (err) {
      console.error("API Error", err);
    }
  }

  useEffect(() => {
    get_all_chats()
  }, [])


  // call ask api
  const ask_api_call = async () => {
    if (!text.trim()) return;
    const currentText = text;
    setText("")
    try {
      const res = await axios.post(`http://127.0.0.1:8000/chats/${chatId}/messages`,
        {
          content: currentText
        },
        {
          params: {
            user_id: "aditya98",
          },
          headers: {
            "Content-Type": "application/json",
            "Accept": 'application/json'
          }
        }
      )
      console.log("Message sent successfully");
    } catch (err) {
      console.error("error occured", err)
    }finally{
      setBool(true)
    }
  }



  return (
    <div className="flex min-h-screen bg-[#212121]
     text-white">
      <div className="bg-amber-200 h-full">
        <aside className="hidden w-64 shrink-0
       bg-[#171717]
       text-white sm:flex
        justify-center
        min-h-screen
       ">
          <Sidebar
            allChats={allChats}
            chatId={chatId}
            separateChat={separateChat}
          />
        </aside>
      </div>
      <main className="flex-1 min-w-0 bg-[#212121]
       text-white mx-auto">
        <Main
          chat={chat}
          text={text}
          setText={setText}
          ask_api_call={ask_api_call}
        />
      </main>
    </div>
  )
}

export default LiftedUp