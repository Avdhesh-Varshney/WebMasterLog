import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
function Dashborad() {
  return (
    <div className='p-10'>
      <h2 className='font-serif  text-2xl'>Create  your Interview</h2>
      <h2 className='text-gray-500 font-serif'>Try to answer atleast one question to receive feedback.</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      {/*Previous Interview List */}
      <InterviewList/>
    </div>

  )
}

export default Dashborad