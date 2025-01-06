import React from 'react'
import { Button } from '../../../components/ui/button'
import { useRouter } from 'next/navigation';

function InterviewItemCard({ interview }) {

  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId)
  }

  const onFeedbackPress = () => {
    router.push('/dashboard/interview/' + interview.mockId + "/feedback")
  }

  return (
    <div className='block rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10 dark:hover:border-blue-500/10 dark:hover:shadow-blue-500/10'>
      <h2 className='font-serif text-blue-400 dark:text-blue-300'>{interview?.jobPosition}</h2>
      <h2 className='font-serif text-sm text-gray-600 dark:text-gray-400'>Years of experience : {interview?.jobExperience}</h2>
      <h2 className='font-serif text-xs text-gray-400 dark:text-gray-500'>Created on : {interview.createdAt}</h2>
      <div className='flex justify-between mt-2 gap-5'>
        <Button size='sm' variant="outline" className="w-full font-serif text-gray-800 dark:text-gray-100 dark:border-gray-600" onClick={onFeedbackPress}>Feedback</Button>
        <Button size='sm' className="bg-blue-400 hover:bg-blue-600 w-full font-serif dark:bg-blue-500 dark:hover:bg-blue-600" onClick={onStart}>Start</Button>
      </div>
    </div>
  )
}

export default InterviewItemCard
