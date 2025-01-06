import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, onQuestionChange }) {
  const [voices, setVoices] = useState([]);

  // Fetch available voices once when the component mounts
  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Fetch voices when the voices have loaded
    window.speechSynthesis.onvoiceschanged = fetchVoices;

    // Call fetchVoices immediately in case the voices are already loaded
    fetchVoices();
  }, []);

  const textToSpeech = (text) => {
    console.log('Text to speech function called with text:', text); // Log the text being processed

    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.onerror = (event) => {
        console.error('Speech synthesis error:', event.error); // Log any errors during synthesis
      };

      // Select a default voice if available
      const defaultVoice = voices.length > 0 ? voices[0] : null; // Select the first voice as default
      if (defaultVoice) {
        speech.voice = defaultVoice;
      } else {
        console.warn('No voices available. Using default voice.');
      }

      // Set other optional properties
      speech.volume = 1; // Volume level from 0 to 1
      speech.rate = 1; // Speaking rate from 0.1 to 10
      speech.pitch = 1; // Pitch level from 0 to 2
      
      window.speechSynthesis.speak(speech);
    } else {
      console.error('Text-to-speech not supported in this browser.');
      alert('Text-to-speech not supported in this browser.'); // Alert for unsupported browsers
    }
  };

  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer 
              ${activeQuestionIndex === index ? 'bg-blue-500 text-white' : 'bg-secondary text-black dark:bg-gray-200'}`}
            onClick={() => onQuestionChange(index)} // Update active question index on click
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className='my-5 text-md md:text-lg'>
        {mockInterviewQuestion[activeQuestionIndex]?.question}
      </h2>
      <Volume2 
        className="cursor-pointer" 
        onClick={() => {
          const question = mockInterviewQuestion[activeQuestionIndex]?.question;
          if (question) {
            textToSpeech(question);
          } else {
            console.error('No question available for speech synthesis.');
          }
        }} 
      />

      <div className='font-serif p-5 border rounded-lg border-[#4AA0E7] bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-600'>
          <Lightbulb />
          <strong>Important</strong>
        </h2>
       <h2 className="mt-3 font-serif text-blue-600 text-sm">
  <p><strong>Note:</strong> Wait for the <strong>"Answer recorded successfully"</strong> toast as the model may be slow.</p>
  <p>-Use the <strong>'Record Answer'</strong> button to respond to each question.</p>
  <p>-Speak <strong>clearly</strong> and at a <strong>steady pace</strong> to ensure accuracy.</p>
  <p>-Ensure you record an answer for <strong>every question</strong>.</p>
  <p>-After the interview, you'll receive feedback with correct answers to improve performance.</p>
</h2>



      </div>
    </div>
  );
}

export default QuestionsSection;
