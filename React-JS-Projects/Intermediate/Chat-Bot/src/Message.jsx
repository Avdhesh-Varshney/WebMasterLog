import { marked } from 'marked';
import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';

const Message = ({ message }) => {
  const { text, sender } = message;
  const messageClass = sender === 'user' ? 'bg-transparent text-white self-end' : 'self-start bg-transparent text-white';


  const renderMessage = (message) => {
    const htmlContent = marked(message);
    return { __html: htmlContent };
  };


  return (
    <div className={`p-2 mb-2 rounded-lg ${messageClass} whitespace-pre-wrap flex gap-3`}>
      {
        sender == "user" ? (
          <>
            <p>{text}</p>
            <FaUser className=' bg-blue-500 p-2 rounded-full' size={40} />
          </>
        ) : (
          <>
            <FaRobot className='bg-green-500 p-2 rounded-full w-10' size={40} />
            <p dangerouslySetInnerHTML={renderMessage(text)} className='w-fit'></p>
          </>
        )

      }
    </div>
  );
};

export default Message;
