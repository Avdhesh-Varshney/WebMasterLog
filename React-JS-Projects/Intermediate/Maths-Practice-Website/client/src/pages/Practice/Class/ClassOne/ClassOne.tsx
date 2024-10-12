import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Card, CardBody, Progress, Chip } from "@nextui-org/react";
import { BookOpen, Plus, Minus, Layout, ArrowLeftRight } from "lucide-react";

interface Topic {
  icon: React.ReactNode;
  title: string;
  progress: number;
  completed: boolean;
  details: string[];
  path: string;
}

interface ClassProgress {
  averageProgress: number;
  topics: Topic[];
}

const initialTopics: Topic[] = [
  { 
    icon: <BookOpen className="w-6 h-6" />,
    title: "Counting & Numbers",
    progress: 0,
    completed: false,
    details: [
      "Understanding numbers up to 10",
      "Learning number sequences and basic counting"
    ],
    path: "/Class/ClassOne/CountingAndNumbers"
  },
  {
    icon: <Plus className="w-6 h-6" />,
    title: "Basic Addition",
    progress: 0,
    completed: false,
    details: [
      "Simple addition problems with single digit",
      "Using objects or visual aids to add numbers"
    ],
    path: "/Class/ClassOne/BasicAddition"
  },
  {
    icon: <Minus className="w-6 h-6" />,
    title: "Basic Subtraction",
    progress: 0,
    completed: false,
    details: [
      "Introduction to subtraction using objects",
      "Single-digit subtraction exercises"
    ],
    path: "/Class/ClassOne/BasicSubtraction"
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Shapes & Patterns",
    progress: 0,
    completed: false,
    details: [
      "Identifying basic shapes (circle, square, triangle)",
      "Recognizing patterns and sequences"
    ],
    path: "/Class/ClassOne/ShapesAndPatterns"
  },
  {
    icon: <ArrowLeftRight className="w-6 h-6" />,
    title: "Comparing Numbers",
    progress: 0,
    completed: false,
    details: [
      "Greater than, less than, and equal to concepts",
      "Simple comparison problems"
    ],
    path: "/Class/ClassOne/ComparingNumbers"
  }
];

const ClassOne: React.FC = () => {
  const navigate = useNavigate();
  const [classProgress, setClassProgress] = useState<ClassProgress>({
    averageProgress: 0,
    topics: initialTopics
  });

  useEffect(() => {
    const storedTopics = JSON.parse(localStorage.getItem('classOneTopics') || '{}');
    const updatedTopics = initialTopics.map(topic => ({
      ...topic,
      progress: storedTopics[topic.title] || topic.progress,
      completed: (storedTopics[topic.title] || 0) === 100
    }));

    const totalProgress = updatedTopics.reduce((sum, topic) => sum + topic.progress, 0);
    const averageProgress = totalProgress / updatedTopics.length;

    const newClassProgress = {
      averageProgress: Number(averageProgress.toFixed(2)),
      topics: updatedTopics
    };

    setClassProgress(newClassProgress);

    // Store the entire ClassProgress object in localStorage
    localStorage.setItem('classOneProgress', JSON.stringify(newClassProgress));
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Class I Maths</h1>
      <h2 className="text-xl mb-6">Introduction to Basic Math Skills</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
        <Progress 
          value={classProgress.averageProgress} 
          className="max-w-md" 
          color="success"
          size="md"
        />
        <p className="mt-2">Average Progress: {classProgress.averageProgress}%</p>
      </div>
      
      {classProgress.topics.map((topic, index) => (
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
        © 2024 Maths Learning Platform
      </footer>
    </motion.div>
  );
};

export default ClassOne;