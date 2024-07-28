import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';
import Welcome from './Welcome';
import { FaPaperPlane } from 'react-icons/fa';

const API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false)
  const loadingMessage = {sender: "bot", text: "Please wait..."}

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    try {
      setLoading(true)
      const response = await axios.post(API_URL, {
        contents: [
          {
            parts: [
              { 
                text: input 
              }
            ]
          }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log(response.data)
      const botMessage = { text: response.data?.candidates[0].content.parts[0].text.trim(), sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }finally{
      setLoading(false)
    }

    setInput('');
  };

  return (
    <div className="flex flex-col items-center mx-auto w-full md:w-3/4 lg:w-2/4 shadow-lg bg-transparent h-screen p-2 pb-7">
      <div className="flex flex-col w-full flex-1 p-2 px-4 mb-4 overflow-y-scroll bg-transparent rounded-md no-scrollbar">
        {messages.length === 0 && <Welcome/>}
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        {loading && <Message message={loadingMessage} /> }
      </div>
      <form onSubmit={sendMessage} className="flex w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded-l-md focus:outline-none bg-gray-900 border-0 text-white"
        />
        <button type="submit" className="px-4 py-2 text-white bg-gray-700 rounded-r-md hover:bg-gray-800 focus:outline-none"><FaPaperPlane/></button>
      </form>
    </div>
  );
};

export default Chatbot;

