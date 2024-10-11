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
import Q2Image1 from "../../../../assets/Maths Images/Basic Addition 2a.png";
import Q2Image2 from "../../../../assets/Maths Images/Basic Addition 2b.png";
import Q4Image1 from "../../../../assets/Maths Images/Basic Addition 4a.png";
import Q4Image2 from "../../../../assets/Maths Images/Basic Addition 4b.png";

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
        text: "What is 2 + 3?",
        options: ["5", "4", "6", "7"],
        correctAnswer: "5",
        solution: "To solve 2 + 3, we can count on our fingers! Start with 2 fingers, then add 3 more. Count all your fingers, and you'll see it's 5! ✋"
    },
    {
        id: 2,
        text: "If you have 4 footballs and get 2 more, how many balls do you have in total?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "6",
        images: [Q2Image1, Q2Image2],
        solution: "Imagine you have 4 footballs. Now, someone gives you 2 more. Let's count them all: 1, 2, 3, 4 (the ones you had), then 5, 6 (the new ones). So, 4 + 2 = 6 footballs in total! ⚽⚽⚽⚽ + ⚽⚽ = 6"
    },
    {
        id: 3,
        text: "What is 1 + 5?",
        options: ["5", "6", "7", "4"],
        correctAnswer: "6",
        solution: "Think of it like this: You have 1 cookie 🍪, and your friend gives you 5 more 🍪🍪🍪🍪🍪. If you count all the cookies, you'll have 6! So, 1 + 5 = 6."
    },
    {
        id: 4,
        text: "If there are 3 birds on a tree and 2 more join, how many birds are there now?",
        options: ["4", "5", "6", "7"],
        correctAnswer: "5",
        images: [Q4Image1, Q4Image2],
        solution: "Picture 3 birds sitting on a tree 🐦🐦🐦. Then, 2 more birds fly in 🐦🐦. Let's count them all: 1, 2, 3 (the first group), 4, 5 (the new arrivals). That makes 5 birds in total!"
    },
    {
        id: 5,
        text: "What is 0 + 4?",
        options: ["4", "3", "5", "6"],
        correctAnswer: "4",
        solution: "When we add 0 to any number, the number stays the same. It's like having no candies 🚫 and then getting 4 candies 🍬🍬🍬🍬. You end up with just the 4 candies you received. So, 0 + 4 = 4!"
    }
];

const BasicAddition: React.FC = () => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [showSolutions, setShowSolutions] = useState(false);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const storedProgress = localStorage.getItem('basicAdditionProgress');
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

        localStorage.setItem('basicAdditionProgress', newProgress.toString());

        const classOneTopics = JSON.parse(localStorage.getItem('classOneTopics') || '{}');
        classOneTopics['Basic Addition'] = newProgress;
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
                <h1 className="text-2xl font-bold mb-4">Class I Maths - Basic Addition</h1>

                {questions.map((question) => (
                    <Card key={question.id} className="mb-6">
                        <CardBody>
                            <h2 className="text-lg font-semibold mb-2">{question.text}</h2>
                            {question.images && (
                                <div className="flex justify-around mb-4">
                                    {question.images.map((img, index) => (
                                        <img key={index} src={img} alt={`Question ${question.id} - Image ${index + 1}`} className="rounded-lg w-1/3" />
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
                            Great job! You've completed the Basic Addition exercise. Let's look at the solutions to learn more!
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

export default BasicAddition;