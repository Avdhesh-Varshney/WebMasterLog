'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const ResultsPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const score = searchParams.get('score');
    const total = searchParams.get('total');

    return (
        <div 
            className="max-w-xl mx-auto mt-8 text-center p-8 border-2 border-blue-600 rounded"
        >
            <h2 
                className="text-2xl font-bold"
            >
                Your Score: {score}/{total}
            </h2>
            <p 
                className="mt-4"
            >
                Thanks for taking the quiz!
            </p>
            <button
                onClick={() => router.push('/')}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Go Home
            </button>
        </div>
    );
};

export default ResultsPage;
