import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Card, CardBody, Progress, Chip } from "@nextui-org/react";
import { PlusSquare, MinusSquare, Grid, Clock, Coins } from "lucide-react";

interface Topic {
  icon: React.ReactNode;
  title: string;
  progress: number;
  completed: boolean;
  details: string[];
  path: string;
}

const initialTopics: Topic[] = [
  {
    icon: <PlusSquare className="w-6 h-6" />,
    title: "Advanced Addition",
    progress: 0,
    completed: false,
    details: [
      "Adding two-digit numbers",
      "Introduction to carrying over in addition"
    ],
    path: "/Class/ClassTwo/AdvancedAddition"
  },
  {
    icon: <MinusSquare className="w-6 h-6" />,
    title: "Advanced Subtraction",
    progress: 0,
    completed: false,
    details: [
      "Subtracting two-digit numbers",
      "Introduction to borrowing in subtraction"
    ],
    path: "/Class/ClassTwo/AdvancedSubtraction"
  },
  {
    icon: <Grid className="w-6 h-6" />,
    title: "Place Value",
    progress: 0,
    completed: false,
    details: [
      "Understanding tens and ones",
      "Breaking down numbers by place value"
    ],
    path: "/Class/ClassTwo/PlaceValue"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Introduction to Time",
    progress: 0,
    completed: false,
    details: [
      "Reading clocks (hours and half-hours)",
      "Basic understanding of time (AM/PM)"
    ],
    path: "/Class/ClassTwo/IntroductionToTime"
  },
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Money & Counting Coins",
    progress: 0,
    completed: false,
    details: [
      "Identifying different coins and notes",
      "Simple addition and subtraction with money"
    ],
    path: "/Class/ClassTwo/MoneyAndCountingCoins"
  }
];

const ClassTwo: React.FC = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>(initialTopics);

  useEffect(() => {
    const storedTopics = JSON.parse(localStorage.getItem('classTwoTopics') || '{}');
    const updatedTopics = initialTopics.map(topic => ({
      ...topic,
      progress: storedTopics[topic.title] || topic.progress,
      completed: (storedTopics[topic.title] || 0) === 100
    }));
    setTopics(updatedTopics);
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Class II Maths</h1>
      <h2 className="text-xl mb-6">Strengthen Your Skills in Addition and Subtraction</h2>

      {topics.map((topic, index) => (
        <Card 
          key={index} 
          className="mb-4 w-full cursor-pointer hover:shadow-lg transition-shadow duration-300" 
          isPressable
          onPress={() => navigate(topic.path)}
        >
          <CardBody>
            <div className="flex items-center mb-2">
              <div className="bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0">
                {topic.icon}
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold truncate">{topic.title}</h3>
                <div className="flex items-center">
                  <Progress 
                    value={topic.progress} 
                    className="max-w-md flex-grow" 
                    color="primary"
                    size="sm"
                  />
                  <span className="ml-2 text-sm whitespace-nowrap">{topic.progress}% Completed</span>
                </div>
              </div>
              <Chip 
                color={topic.completed ? "success" : "warning"} 
                variant="flat" 
                className="ml-2"
              >
                {topic.completed ? "Completed" : "In Progress"}
              </Chip>
            </div>
            <ul className="list-disc pl-12 mt-2 text-sm text-gray-600">
              {topic.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </ul>
          </CardBody>
        </Card>
      ))}

      <footer className="mt-8 text-center text-sm text-gray-500">
        &copy; 2024 Maths Learning Platform
      </footer>
    </motion.div>
  );
};

export default ClassTwo;
