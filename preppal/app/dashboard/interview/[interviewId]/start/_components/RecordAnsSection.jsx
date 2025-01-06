"use client";
import Image from 'next/image';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { Button } from '../../../../../../components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '../../../../../../utils/GeminiAIModal';
import { db } from '../../../../../../utils/db';
import { UserAnswer } from '../../../../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const lastTranscriptRef = useRef(''); // Track last processed transcript

  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    // Filter out duplicate transcripts
    const newResults = results
      .map(result => result?.transcript)
      .filter(transcript => transcript !== lastTranscriptRef.current);

    if (newResults.length > 0) {
      const concatenatedResults = newResults.join(' ') + ' ';
      setUserAnswer(prevAns => prevAns + concatenatedResults);
      
      // Update the last transcript reference to the latest result
      lastTranscriptRef.current = results[results.length - 1]?.transcript || '';
      setResults([]); // Clear results to prevent reprocessing
    }
  }, [results, setResults]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording, userAnswer]);

  const StartStopRecording = useCallback(async () => {
    isRecording ? stopSpeechToText() : startSpeechToText();
  }, [isRecording, startSpeechToText, stopSpeechToText]);

  const UpdateUserAnswer = useCallback(async () => {
    console.log(userAnswer);
    setLoading(true);

    const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Please give a rating and improvement feedback in JSON format with "rating" and "feedback" fields.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);

      if (result && result.response && typeof result.response.text === 'function') {
        // Remove code block markdown and extra whitespace
        let mockJsonResp = (await result.response.text()).replace(/```json|```/g, "").trim();

        // Sanitize the JSON string to escape any control characters
        mockJsonResp = mockJsonResp.replace(/[\x00-\x1F\x7F]/g, ''); // Remove control characters

        // Parse the sanitized JSON response
        const JsonFeedbackResp = JSON.parse(mockJsonResp);

        const resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy'),
        });

        if (resp) {
          toast('User Answer recorded successfully', {
            position: 'top-center',
            autoClose: 3000,
          });
          setUserAnswer('');
          setResults([]); // Reset results
        }
      }
    } catch (error) {
      console.error('Error in UpdateUserAnswer:', error);
      toast('Error processing your answer. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  }, [userAnswer, activeQuestionIndex, mockInterviewQuestion, interviewData, user]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image 
          src="/webcam.png" 
          width={100} 
          height={100} 
          alt="Webcam icon" 
          className="absolute" 
        />
        <Webcam
          mirrored={true}
          style={{
            height: 350,
            width: '100%',
            zIndex: 10,
          }}
        />
      </div>
      
      <Button 
        disabled={loading}
        variant="none"
        className="my-10" 
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-500 animate-pulse flex gap-2 items-center font-serif">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className='font-serif inline-flex justify-center items-center py-2 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-400 to-red-400 bg-[length:200%_100%] animate-shine hover:animate-blink focus:ring-4 focus:ring-primary-300 dark:focus:ring-blue-900'>
            <Mic /> Record Answer
          </h2> 
        )}
      </Button>
    </div>
  );
}

export default RecordAnsSection;
