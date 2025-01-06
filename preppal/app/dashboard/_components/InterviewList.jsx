"use client";
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/db';
import { MockInterview } from '../../../utils/schema';
import { desc, eq } from 'drizzle-orm';
import InterviewItemCard from '../_components/InterviewItemCard';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));

    console.log(result);
    setInterviewList(result);
  };

  return (
    <div>
      <h2 className='font-serif text-xl'>Previous Mock Interview List</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
        {interviewList.length > 0 ? (
          interviewList.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))
        ) : (
          <p className='text-gray-500 text-center w-full'>Take an interview to see it listed here!</p>
        )}
      </div>
    </div>
  );
}

export default InterviewList;
