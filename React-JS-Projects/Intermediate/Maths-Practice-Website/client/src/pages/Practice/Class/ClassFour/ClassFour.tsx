import React from 'react';
import { motion } from "framer-motion";
import { Card, CardBody, Progress, Chip } from "@nextui-org/react";
import { X, DivideSquare, Percent, Shapes, Clock } from "lucide-react";

const topics = [
  {
    icon: <X className="w-6 h-6" />,
    title: "Advanced Multiplication",
    progress: 10,
    completed: true,
    details: [
      "Multiplying two-digit numbers",
      "Learning multiplication tables (up to 10)"
    ]
  },
  {
    icon: <DivideSquare className="w-6 h-6" />,
    title: "Division with Remainders",
    progress: 10,
    completed: true,
    details: [
      "Solving division problems with remainders",
      "Practical applications of division"
    ]
  },
  {
    icon: <Percent className="w-6 h-6" />,
    title: "Fractions & Decimals",
    progress: 10,
    completed: true,
    details: [
      "Adding and subtracting fractions with like denominators",
      "Introduction to decimals and their relation to fractions"
    ]
  },
  {
    icon: <Shapes className="w-6 h-6" />,
    title: "Geometry",
    progress: 10,
    completed: true,
    details: [
      "Identifying and working with 2D and 3D shapes",
      "Introduction to symmetry and simple angles"
    ]
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Time & Timelines",
    progress: 0,
    completed: false,
    details: [
      "Understanding elapsed time",
      "Reading calendars and solving time-based problems"
    ]
  }
];

const Class4MathsProgress: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Class IV Maths</h1>
      <h2 className="text-xl mb-6">Advance Your Math Skills with Interactive Exercises</h2>
      
      {topics.map((topic, index) => (
        <Card key={index} className="mb-4">
          <CardBody>
            <div className="flex items-center mb-2">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                {topic.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{topic.title}</h3>
                <div className="flex items-center">
                  <Progress 
                    value={topic.progress} 
                    className="max-w-md" 
                    color="primary"
                  />
                  <span className="ml-2">{topic.progress}% Completed</span>
                </div>
              </div>
              <Chip color={topic.completed ? "success" : "warning"} variant="flat">
                {topic.completed ? "Completed" : "Not Started"}
              </Chip>
            </div>
            <ul className="list-disc pl-12">
              {topic.details.map((detail, detailIndex) => (
                <li key={detailIndex}>{detail}</li>
              ))}
            </ul>
          </CardBody>
        </Card>
      ))}
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2024 Maths
      </footer>
    </motion.div>
  );
};

export default Class4MathsProgress;