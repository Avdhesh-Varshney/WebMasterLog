import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-center h-full my-20">
      {/* Background for Light Mode and Dark Mode */}
      <div 
        className="absolute inset-0 -z-10 h-full w-full px-5 py-24 
          [background:radial-gradient(125%_125%_at_50%_10%,#e0f2fe_40%,#3b82f6_100%)] 
          dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#3b82f6_100%)]"
      ></div>

      {/* SignIn Component */}
      <SignIn />
    </div>
  );
}
