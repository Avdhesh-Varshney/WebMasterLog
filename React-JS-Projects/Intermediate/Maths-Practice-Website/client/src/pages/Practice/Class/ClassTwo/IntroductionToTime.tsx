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
import Q5Image1 from "../../../../assets/Maths Images/Introduction to Time 5a.png";
import Q5Image2 from "../../../../assets/Maths Images/Introduction to Time 5b.png";
import Q1Image1 from "../../../../assets/Maths Images/Introduction to Time 1.png";
import Q2Image1 from "../../../../assets/Maths Images/Introduction to Time 2.png";
import Q4Image1 from "../../../../assets/Maths Images/Introduction to Time 4.png";

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
    text: "What time is it when the clock shows the hour hand on 3 and the minute hand on 12?",
    options: ["2:00", "1:30", "3:00", "6:00"],
    correctAnswer: "3:00",
    images: [Q1Image1],
    solution: "The place value of a digit depends on its position in the number. The 7 in 57 is in the tens place, which means it represents 70. So, the place value of 7 in 57 is 70!"
  },
  {
    id: 2,
    text: "If the minute hand points to 6, what time is it?",
    options: ["12:30", "1:30", "3:00", "6:00"],
    correctAnswer: "12:30",
    images:[Q2Image1],
    solution: "The 8 in 84 is in the tens place, which means it represents 80. We can also say it is 8 tens. So, both statements are correct!"
  },
  {
    id: 3,
    text: "What time is it if the hour hand is on 2 and the minute hand is on 6?",
    options: ["2:15", "2:30", "2:45", "3:00"],
    correctAnswer: "2:30",
    images: [],
    solution: "In the number 30, the digit 3 is in the tens place, which means it represents 30. So, 30 is the correct answer!"
  },
  {
    id: 4,
    text: "If it is 7:00 AM, what time is it in the evening?",
    options: ["7:00 PM", "12:00 PM", "6:00 PM", "5:00 PM"],
    correctAnswer: "7:00 PM",
    images:[Q4Image1],
    solution: "In the number 65, the digit 5 is in the ones place, and it represents 5. However, the 6 is in the tens place, which means it represents 60. Thus, the correct value of the digit 5 in the context of place value is 50!"
  },
  {
    id: 5,
    text: "When the clock shows 4:00, how many hours until it is 8:00?",
    options: ["2 hours", "3 hours", "4 hours", "1 hours"],
    correctAnswer: "4 hours",
    images: [Q5Image1, Q5Image2],
    solution: "When you break down 47, you separate it into 40 and 7. The 4 represents 40 (four tens), and the 7 represents 7. So, the place values of 47 are 40 and 7!"
  }
];

const PlaceValue: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showSolutions, setShowSolutions] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const storedProgress = localStorage.getItem('placeValueProgress');
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
    localStorage.setItem('placeValueProgress', newProgress.toString());

    const classTwoTopics = JSON.parse(localStorage.getItem('classTwoTopics') || '{}');
    classTwoTopics['Place Value'] = newProgress;  // Update specific topic progress
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
        <h1 className="text-2xl font-bold mb-4">Class II Maths - Place Value</h1>

        {questions.map((question) => (
          <Card key={question.id} className="mb-6">
            <CardBody>
              <h2 className="text-lg font-semibold mb-2">{question.text}</h2>
              
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
              Great job! You've completed the Advanced Subtraction exercise. Let's look at the solutions to learn more!
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

export default PlaceValue;
