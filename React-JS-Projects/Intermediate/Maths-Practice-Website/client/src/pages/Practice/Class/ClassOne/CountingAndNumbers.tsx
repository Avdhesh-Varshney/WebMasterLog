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
    Progress
} from "@nextui-org/react";
import { motion } from "framer-motion";
import confetti from 'canvas-confetti';
import Image1 from "../../../../assets/Maths Images/Counting & Numbers 1.png";
import Image2 from "../../../../assets/Maths Images/Counting & Numbers 4.png";

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: string;
    image?: string;
    solution: string;
}

const questions: Question[] = [
    {
        id: 1,
        text: "How many apples are there in the picture?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "3",
        image: Image1,
        solution: "There are 3 apples in the picture. You can count them one by one to verify."
    },
    {
        id: 2,
        text: "Which number comes after 7?",
        options: ["5", "6", "8", "9"],
        correctAnswer: "8",
        solution: "In the number sequence, 8 comes immediately after 7."
    },
    {
        id: 3,
        text: "What number is missing? 1, 2, ___, 4, 5",
        options: ["3", "6", "7", "8"],
        correctAnswer: "3",
        solution: "The missing number is 3. The sequence is counting up by 1, so after 2 comes 3."
    },
    {
        id: 4,
        text: "How many stars are there in the picture?",
        options: ["3", "5", "7", "8"],
        correctAnswer: "5",
        image: Image2,
        solution: "There are 5 stars in the picture. You can count them one by one to verify."
    },
    {
        id: 5,
        text: "Which number is the biggest?",
        options: ["5", "9", "6", "3"],
        correctAnswer: "9",
        solution: "9 is the biggest number among the options. You can compare each number to see that 9 is greater than all others."
    }
];

const CountingNumbersExercise: React.FC = () => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showSolutions, setShowSolutions] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [questionScores, setQuestionScores] = useState<Record<number, number>>({});

    useEffect(() => {
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
        const newQuestionScores: Record<number, number> = {};

        questions.forEach(question => {
            if (answers[question.id] === question.correctAnswer) {
                totalScore += 10;
                newQuestionScores[question.id] = 10;
            } else {
                newQuestionScores[question.id] = 0;
            }
        });

        setScore(totalScore);
        setQuestionScores(newQuestionScores);
        setIsSubmitted(true);
        setShowSolutions(true);
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
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-3/4 pr-4"
            >
                <h1 className="text-2xl font-bold mb-4">Counting & Numbers</h1>

                {questions.map((question) => (
                    <Card key={question.id} className="mb-6">
                        <CardBody>
                            <h2 className="text-lg font-semibold mb-2">{question.text}</h2>
                            {question.image && (
                                <img src={question.image} alt="Question" className="mb-4 rounded-lg" />
                            )}
                            <div className="grid grid-cols-2 gap-2">
                                {question.options.map((option, index) => (
                                    <Button
                                        key={index}
                                        color={answers[question.id] === option ? "success" : "default"}
                                        onClick={() => handleAnswerChange(question.id, option)}
                                        className="w-full rounded-md"
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
                                    <p>{question.solution}</p>
                                    <p className="mt-2 font-bold">Points: {questionScores[question.id]} / 10</p>
                                </motion.div>
                            )}
                        </CardBody>
                    </Card>
                ))}
            </motion.div>

            <div className="w-1/4 mt-12">
                <Card className="sticky top-4">
                    <CardBody>
                        <h3 className="text-lg font-semibold mb-4">Exercise Progress</h3>
                        <p>Time Elapsed: {formatTime(timeElapsed)}</p>
                        <p>Questions Answered: {Object.keys(answers).length}/{questions.length}</p>
                        {isSubmitted && (
                            <p>Total Score: {score} / {questions.length * 10}</p>
                        )}
                        <Button
                            color="success"
                            className="mt-4 w-full"
                            onClick={calculateScore}
                            disabled={isSubmitted}
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
                            <div className="relative w-48 h-48">
                                <Progress
                                    size="lg"
                                    value={(score / (questions.length * 10)) * 100}
                                    color="success"
                                    showValueLabel={true}
                                    className="w-full h-full"
                                    aria-label="Score progress"
                                />
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="text-3xl font-bold">{score} / {questions.length * 10}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-center mb-4">
                        Great job! You've completed the Counting & Numbers exercise.
                        </p>
                        <p>Time required: {formatTime(timeElapsed)}</p>
                        <p>Questions answered: {Object.keys(answers).length}/{questions.length}</p>
                        <p>Total score: {score} / {questions.length * 10}</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={() => setIsModalOpen(false)}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CountingNumbersExercise;