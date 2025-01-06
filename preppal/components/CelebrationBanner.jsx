import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const CelebrationBanner = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set the state to true after component is mounted on the client
    setIsClient(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Only render Confetti after the component is mounted on the client */}
      {isClient && <Confetti recycle={false} numberOfPieces={600} gravity={0.1} />}

      <div className="bg-blue-950 dark:bg-gradient-to-r from-black via-blue-950 to-black text-white text-center px-6  shadow-xl font-semibold max-w-full">
        <div className="flex justify-center items-center space-x-2">
          <span className="text-lg animate-pulse">🎉</span>
          <p className="text-lg font-medium leading-tight">
            We’ve hit the 100-user limit! If you want to try PrepPal, just reach out, and we’ll make it happen!
          </p>
          <span className="text-lg animate-pulse">🎉</span>
        </div>
      </div>
    </div>
  );
};

export default CelebrationBanner;
