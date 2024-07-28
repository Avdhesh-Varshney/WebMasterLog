import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";

const Chatbot = () => {
  const [input, setInput] = useState('');
  const messages = [
    { text: 'Hello! Welcome to Web Master Log Project', type: 'bot' },
    { text: 'Explain about WebMasterLog Project', type: 'user' },
  ];
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
  };

  return (
    <div className="d-flex flex-column bg-white rounded shadow-lg" style={{ zIndex: 1000, position: 'fixed', bottom: '35px', right: '55px' }}>
      <div className="flex-grow-1 overflow-auto p-3">
        {messages.map((msg, index) => (
          <div key={index} className={`${msg.type === 'user' ? 'text-end' : 'text-start'}`}>
            {msg.type === 'bot' ? <FaRobot className='text-dark me-2' style={{ fontSize: '2rem' }} /> : ''}

            <span className={`d-inline-block p-2 mt-2 ${msg.type === 'user' ? 'bg-primary' : 'bg-dark text-light'} rounded`}>
              {msg.text}
            </span>

            {msg.type === 'user' ? <FaUser className='text-dark ms-2' style={{ fontSize: '2rem' }} /> : ''}
          </div>
        ))}
      </div>

      <div className="input-group p-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="form-control"
          placeholder="Enter your query..."
        />
        <button onClick={handleSendMessage} className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
