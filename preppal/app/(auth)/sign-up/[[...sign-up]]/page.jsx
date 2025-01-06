import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignUp />
    </div>
  );
}
