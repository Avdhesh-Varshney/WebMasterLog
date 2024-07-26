"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import questions from '../../../public/questions.json';

export default function Quiz() {

    const { id } = useParams();
    const quiz = questions.filter((q) => q.category === id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const router = useRouter();

    const handleAnswerClick = (answer) => {
        if (answer === quiz[currentQuestion].answer) {
          setScore(score + 1);
        }
    
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quiz.length) {
          setCurrentQuestion(nextQuestion);
        } else {
            router.push(`/results?score=${score + 1}&total=${quiz.length}`)
        }
    };

    return (
        <div 
            className="max-w-xl mx-auto mt-8 p-8 border-2 border-blue-600 rounded relative"
        >
            <h3 
                className='mb-2 absolute -top-5 right-5 py-2 px-5 bg-blue-600 text-white rounded-full'
            >
                Question {currentQuestion+1} of {quiz.length}
            </h3>
            <h2 
                className="text-xl font-bold mb-4"
            >
                {quiz[currentQuestion].question}
            </h2>
            <div 
                className="space-y-2"
            >
                {quiz[currentQuestion].options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(option)}
                        className="w-full border-2 border-blue-600 p-2 rounded hover:bg-blue-600 text-white text-left"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}