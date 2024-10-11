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

// Import images (you'll need to replace these with actual image imports)
import Q1Image1 from "../../../../assets/Maths Images/Basic Subtraction 1a.png";
import Q1Image2 from "../../../../assets/Maths Images/Basic Subtraction 1b.png";
import Q3Image1 from "../../../../assets/Maths Images/Basic Subtraction 4a.png";
import Q3Image2 from "../../../../assets/Maths Images/Basic Subtraction 4b.png";

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
        text: "If you have 4 cookies and eat 2, how many are left?",
        options: ["3", "2", "4", "1"],
        correctAnswer: "2",
        images: [Q1Image1, Q1Image2],
        solution: "Start with 4 cookies. Eat 2 cookies. Count what's left: 1, 2. So, 4 - 2 = 2 cookies left!"
    },
    {
        id: 2,
        text: "What is 4 - 1?",
        options: ["3", "2", "1", "4"],
        correctAnswer: "3",
        solution: "Think of 4 fingers. Put down 1 finger. Count the fingers still up: 1, 2, 3. So, 4 - 1 = 3!"
    },
    {
        id: 3,
        text: "If there are 6 apples, and 3 are taken away, how many are left?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3",
        images: [Q3Image1, Q3Image2],
        solution: "Start with 6 apples. Take away 3. Count what's left: 1, 2, 3. So, 6 - 3 = 3 apples left!"
    },
    {
        id: 4,
        text: "What is 7 - 5?",
        options: ["3", "2", "1", "4"],
        correctAnswer: "2",
        solution: "Count 7 objects. Take away 5. Count what's left: 1, 2. So, 7 - 5 = 2!"
    },
    {
        id: 5,
        text: "If you had 10 balloons, and 4 popped, how many do you have now?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "6",
        images: [],
        solution: "Start with 10 balloons. 4 pop! Count the ones not popped: 1, 2, 3, 4, 5, 6. So, 10 - 4 = 6 balloons left!"
    }
];

const BasicSubtraction: React.FC = () => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [showSolutions, setShowSolutions] = useState(false);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const storedProgress = localStorage.getItem('basicSubtractionProgress');
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

        localStorage.setItem('basicSubtractionProgress', newProgress.toString());

        const classOneTopics = JSON.parse(localStorage.getItem('classOneTopics') || '{}');
        classOneTopics['Basic Subtraction'] = newProgress;
        localStorage.setItem('classOneTopics', JSON.stringify(classOneTopics));

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
                <h1 className="text-2xl font-bold mb-4">Class I Maths - Basic Subtraction</h1>

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
                            Great job! You've completed the Basic Subtraction exercise. Let's look at the solutions to learn more!
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

export default BasicSubtraction;