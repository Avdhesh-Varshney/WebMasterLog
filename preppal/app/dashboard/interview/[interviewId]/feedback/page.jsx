"use client";
import { db } from '../../../../../utils/db';
import { UserAnswer } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // Unwrap the params here
        const interviewId = await params;  // Assuming params is a promise
        if (interviewId.interviewId) {
          GetFeedback(interviewId.interviewId);
        }
      } catch (error) {
        console.error("Error fetching params:", error);
        // Handle the error appropriately, such as setting an error state
      }
    };

    fetchFeedback();
  }, [params]);

  const GetFeedback = async (interviewId) => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);

      console.log("Feedback Results:", result);
      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      // Handle feedback fetching error
    }
  };

  return (
    <div className='p-10'>
      {feedbackList.length === 0 ? (
        <h2 className='font-serif text-xl text-gray-500'>No Interview Feedback (Try answering a question).</h2>
      ) : (
        <>
          <h2 className='text-3xl font-serif text-green-500'>Congratulations!</h2>
          <h2 className='font-serif text-2xl'>Here is your interview feedback</h2>
          <h2 className='text-sm text-gray-500'>Find below interview questions with correct answers, your answers, and feedback for improvement:</h2>
          
          {feedbackList.map((item) => (
            <Collapsible key={item.id}>
              <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 text-left gap-7 w-full'>
                {item.question} <ChevronsUpDown className='h-5 w-5' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong> {item.rating}</h2>
                  <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                  <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                  <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-700'><strong>Feedback: </strong>{item.feedback}</h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <div className='gap-5'>
        <Button className='font-serif inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-400 to-blue-700 bg-[length:200%_100%] animate-shine hover:animate-blink focus:ring-4 focus:ring-primary-300 dark:focus:ring-blue-900 my-3' onClick={() => router.replace('/dashboard')}>New Interview</Button>
      </div>
    </div>
  );
}

export default Feedback;
