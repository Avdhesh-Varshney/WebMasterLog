"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../../../../utils/db';
import { MockInterview } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from '../../[interviewId]/start/_components/QuestionsSection';
import RecordAnswerSection from '../../[interviewId]/start/_components/RecordAnsSection';
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const resolvedParams = await params;
      GetInterviewDetails(resolvedParams.interviewId);
    }

    fetchData();
  }, [params]);

  const GetInterviewDetails = async (interviewId) => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };

  // Handler to update active question
  const handleQuestionChange = (index) => {
    setActiveQuestionIndex(index);
  };

  return (
    <div>
      <div className='font-serif grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          onQuestionChange={handleQuestionChange} // Pass down handler
        />

        <RecordAnswerSection
        mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          onQuestionChange={handleQuestionChange} 
          interviewData={interviewData}// Optional, if it needs to change the question
        />
      </div>
      <div className='flex justify-end gap-6'>
       {activeQuestionIndex>0&& 
       <Button className="bg-blue-400 hover:bg-green-700 font-serif"onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
        <Button className="bg-blue-400 hover:bg-blue-700 font-serif" onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex==mockInterviewQuestion?.length-1&&

        <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
        <Button className="bg-blue-400 hover:bg-red-700 font-serif">End Interview</Button>
        </Link>}
      </div>
    </div>
    
  );
}

export default StartInterview;
