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
import Q1Image1 from "../../../../assets/Maths Images/Shapes & Patterns 1a.png";
import Q1Image2 from "../../../../assets/Maths Images/Shapes & Patterns 1b.png";
import Q1Image3 from "../../../../assets/Maths Images/Shapes & Patterns 1c.png";
import Q1Image4 from "../../../../assets/Maths Images/Shapes & Patterns 1d.png";
import Q4Image1 from "../../../../assets/Maths Images/Shapes & Patterns 4.png";
import Q3Image1 from "../../../../assets/Maths Images/Shapes and patterns Image 3.png";

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
        text: "Which shape is a circle?",
        options: ["Circle", "Triangle", "Square", "Rectangle"],
        correctAnswer: "Circle",
        images: [Q1Image1, Q1Image2,Q1Image3,Q1Image4],
        solution: "A circle is round and has no corners. It looks like a ball or the sun!"
    },
    {
        id: 2,
        text: "Which shape has 3 sides?",
        options: ["Circle", "Triangle", "Square", "Rectangle"],
        correctAnswer: "Triangle",
        solution: "A triangle has 3 straight sides and 3 corners. It looks like a slice of pizza!"
    },
    {
        id: 3,
        text: "What comes next in the pattern?",
        options: ["Circle", "Square", "Triangle", "Rectangle"],
        correctAnswer: "Triangle",
        images: [Q3Image1],
        solution: "Look at the pattern: Square, Circle, Square, Circle. The next shape should be a Square to continue the pattern!"
    },
    {
        id: 4,
        text: "Which shape is the same as the one shown?",
        options: ["Circle", "Triangle", "Square", "Rectangle"],
        correctAnswer: "Square",
        images: [Q4Image1],
        solution: "The shape shown has 4 equal sides and 4 corners. That's a square!"
    },
    {
        id: 5,
        text: "How many sides does a square have?",
        options: ["2", "3", "4", "5"],
        correctAnswer: "4",
        solution: "A square has 4 equal sides and 4 corners. Count them: 1, 2, 3, 4!"
    }
];

const ShapesAndPatterns: React.FC = () => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [showSolutions, setShowSolutions] = useState(false);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const storedProgress = localStorage.getItem('shapesAndPatternsProgress');
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

        localStorage.setItem('shapesAndPatternsProgress', newProgress.toString());

        const classOneTopics = JSON.parse(localStorage.getItem('classOneTopics') || '{}');
        classOneTopics['Shapes and Patterns'] = newProgress;
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
                <h1 className="text-2xl font-bold mb-4">Class I Maths - Shapes and Patterns</h1>

                {questions.map((question) => (
                    <Card key={question.id} className="mb-6">
                        <CardBody>
                            <h2 className="text-lg font-semibold mb-2">{question.text}</h2>
                            {question.images && (
                                <div className={`flex ${question.id === 1 ? 'justify-between' : 'justify-center'} mb-4`}>
                                    {question.images.map((img, index) => (
                                        <img key={index} src={img} alt={`Question ${question.id} - Image ${index + 1}`} className={`rounded-lg ${question.id === 1 ? 'w-[22%]' : 'w-2/3'}`} />
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
                            Great job! You've completed the Shapes and Patterns exercise. Let's look at the solutions to learn more!
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

export default ShapesAndPatterns;