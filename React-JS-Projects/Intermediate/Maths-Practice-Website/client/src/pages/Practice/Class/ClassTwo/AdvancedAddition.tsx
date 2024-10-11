import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Card,
    CardBody,
    Progress,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import confetti from 'canvas-confetti';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: string;
    images?: string[];
    solution: string;
}

const questions: Question[] = [
    {
        id: 1,
        text: "What is 27 + 15?",
        options: ["42", "41", "39", "43"],
        correctAnswer: "42",
        images: [],
        solution: "To find the answer, you can count up from 27: 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42. So, 27 + 15 = 42!"
    },
    {
        id: 2,
        text: "What is the sum of 54 + 29?",
        options: ["93", "73", "83", "79"],
        correctAnswer: "83",
        solution: "You can break down the addition: 54 + 29. First, add 54 and 20 to get 74, then add 9 more to get 83. So, 54 + 29 = 83!"
    },
    {
        id: 3,
        text: "Add 68 + 47.",
        options: ["115", "114", "116", "118"],
        correctAnswer: "115",
        images: [],
        solution: "To add 68 and 47, start with 68, then add 40 to get 108. Finally, add 7 to reach 115. So, 68 + 47 = 115!"
    },
    {
        id: 4,
        text: "What is 39 + 26?",
        options: ["66", "67", "65", "68"],
        correctAnswer: "65",
        solution: "You can add 39 and 26 by adding 30 to 39 to get 69, then subtracting 1 because you only added 30 instead of 26. So, 39 + 26 = 65!"
    },
    {
        id: 5,
        text: "If you add 32 and 28, what do you get?",
        options: ["59", "60", "61", "62"],
        correctAnswer: "60",
        images: [],
        solution: "To find the sum of 32 and 28, you can add 30 to 32 to get 62, then subtract 2 to account for the extra 2 in 28. So, 32 + 28 = 60!"
    }
];

const AdvancedAddition: React.FC = () => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [showSolutions, setShowSolutions] = useState(false);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const storedProgress = localStorage.getItem('advancedAdditionProgress');
        if (storedProgress) {
            setProgress(parseInt(storedProgress, 10));
        }

        let timer: number;
        if (isTimerRunning) {
            timer = window.setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => window.clearInterval(timer);
    }, [isTimerRunning]);

    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const calculateScore = () => {
        setIsTimerRunning(false);
        let totalScore = 0;

        questions.forEach(question => {
            if (answers[question.id] === question.correctAnswer) {
                totalScore += 1;
            }
        });

        setScore(totalScore);
        setIsSubmitted(true);
        setShowSolutions(true);

        const newProgress = Math.round((totalScore / questions.length) * 100);
        setProgress(newProgress);

        // Save progress to local storage
        localStorage.setItem('advancedAdditionProgress', newProgress.toString());

        const classTwoTopics = JSON.parse(localStorage.getItem('classTwoTopics') || '{}');
        classTwoTopics['Advanced Addition'] = newProgress;  // Update specific topic progress
        localStorage.setItem('classTwoTopics', JSON.stringify(classTwoTopics));

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        setIsModalOpen(true);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex max-w-6xl mx-auto p-4">
            <div className="w-3/4 pr-4">
                <h1 className="text-2xl font-bold mb-4">Class II Maths - Advanced Addition</h1>

                {questions.map((question) => (
                    <Card key={question.id} className="mb-6">
                        <CardBody>
                            <h2 className="text-lg font-semibold mb-2">{question.text}</h2>
                            {question.images && (
                                <div className={`flex ${question.id === 1 ? 'justify-between' : 'flex-col items-center'} mb-4`}>
                                    {question.images.map((img, index) => (
                                        <img key={index} src={img} alt={`Question ${question.id} - Image ${index + 1}`} className={`rounded-lg ${question.id === 1 ? 'w-[45%]' : 'w-2/3 mb-2'}`} />
                                    ))}
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-2">
                                {question.options.map((option, index) => (
                                    <Button
                                        key={index}
                                        color={answers[question.id] === option ? "primary" : "default"}
                                        onPress={() => handleAnswerChange(question.id, option)}
                                        className="w-full"
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                            {showSolutions && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 p-4 bg-gray-100 rounded-lg"
                                >
                                    <p className="text-sm">{question.solution}</p>
                                    <p className="mt-2 font-bold">
                                        Your answer: {answers[question.id] || "Not answered"}
                                    </p>
                                    <p className="font-bold text-green-600">
                                        Correct answer: {question.correctAnswer}
                                    </p>
                                </motion.div>
                            )}
                        </CardBody>
                    </Card>
                ))}
            </div>

            <div className="w-1/4">
                <Card className="sticky top-4">
                    <CardBody>
                        <h3 className="text-lg font-semibold mb-4">Exercise Progress</h3>
                        <p>Time Elapsed: {formatTime(timeElapsed)}</p>
                        <p>Questions Answered: {Object.keys(answers).length}/{questions.length}</p>
                        <p className="mt-2">Overall Progress: {progress}%</p>
                        <Progress color="primary" value={progress} className="mt-2" />
                        {isSubmitted && (
                            <>
                                <p className="mt-2">Correct Answers: {score}</p>
                                <p>Incorrect Answers: {questions.length - score}</p>
                            </>
                        )}
                        <Button
                            color="success"
                            className="mt-4 w-full"
                            onPress={calculateScore}
                            isDisabled={isSubmitted}
                        >
                            Submit All
                        </Button>
                    </CardBody>
                </Card>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                size="lg"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Your Score</ModalHeader>
                    <ModalBody>
                        <div className="flex justify-center items-center mb-4">
                            <div className="w-48 h-48">
                                <CircularProgressbar
                                    value={(score / questions.length) * 100}
                                    text={`${score}/${questions.length}`}
                                    styles={buildStyles({
                                        textSize: '16px',
                                        pathColor: `rgba(62, 152, 199, ${score / questions.length})`,
                                        textColor: '#3e98c7',
                                        trailColor: '#d6d6d6',
                                    })}
                                />
                            </div>
                        </div>
                        <p className="text-center mb-4">
                            Great job! You've completed the Advanced Addition exercise. Let's look at the solutions to learn more!
                        </p>
                        <p>Time taken: {formatTime(timeElapsed)}</p>
                        <p>Questions answered: {Object.keys(answers).length}/{questions.length}</p>
                        <p>Correct Answers: {score}</p>
                        <p>Incorrect Answers: {questions.length - score}</p>
                        <p>Overall Progress: {progress}%</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={() => setIsModalOpen(false)}>
                            Close and See Solutions
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AdvancedAddition;
