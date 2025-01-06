"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { chatSession } from '../../../utils/GeminiAIModal';
import { db } from '../../../utils/db';
import { MockInterview } from '../../../utils/schema';
import { LoaderCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `Job position:${jobPosition},Job Description:${jobDesc},Years of Experience:${jobExperience},Depends on Job Position,Job Description & Years of Experience give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with Answer in json format,give us question and answer field in json`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      let MockJsonResp = result.response.text();

      // Log the raw response to check its content
      console.log("Raw Response:", MockJsonResp);

      // Clean up response to ensure it's JSON
      MockJsonResp = MockJsonResp.replace(/```json/g, "")
                                  .replace(/```/g, "")
                                  .replace(/\n/g, "")
                                  .trim();

      // Attempt to parse JSON response
      const parsedResponse = JSON.parse(MockJsonResp);
      setJsonResponse(parsedResponse);

      if (parsedResponse) {
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy'),
        }).returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", resp);
        if (resp) {
          setOpenDialog(false);
          router.push('/dashboard/interview/' + resp[0]?.mockId);
        }
      } else {
        console.log("Error: No valid JSON response received.");
      }
    } catch (error) {
      console.error("Error occurred while processing:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className='p-16 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className='font-serif text-xl text-blue-400'>Please share your interview details</DialogTitle>
            <div className="font-serif text-sm text-muted-foreground">
              <div className="mt-2 mb-6">
                Please add details about the job position/role, job description, and years of experience.
              </div>
              <form onSubmit={onSubmit}>
                <div className='mt-7 my-3 text-blue-400'>
                  <label htmlFor="jobPosition">Job Role/Job Position</label>
                  <Input
                    id="jobPosition"
                    placeholder="Ex. SDE-1"
                    required
                    className="text-black dark:text-white"  // Apply text-black for input text color
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div className='my-3 text-blue-400'>
                  <label htmlFor="jobDesc">Job Description / Tech Stack</label>
                  <Textarea
                    id="jobDesc"
                    placeholder="Ex. DSA, React, Behavioral questions, etc."
                    required
                    className="text-black dark:text-white"  // Apply text-black for textarea text color
                    onChange={(e) => setJobDesc(e.target.value)}
                  />
                </div>
                <div className='my-3 text-blue-400'>
                  <label htmlFor="jobExperience">Years of Experience</label>
                  <Input 
                    id="jobExperience"
                    placeholder="Ex. 10"
                    type="number"
                    max="100"
                    required
                    className="text-black dark:text-white"  // Apply text-black for input text color
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>
                <div className='flex gap-5 justify-end mt-6'>
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-400 hover:bg-blue-700" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className='animate-spin' /> Generating from AI
                      </>
                    ) : 'Start Interview'}
                  </Button>
                </div>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;