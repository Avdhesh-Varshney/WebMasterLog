import React from 'react';
import { motion } from "framer-motion";
import { Card, CardBody, Progress, Chip } from "@nextui-org/react";
import { X, DivideSquare, PieChart, Clock, Ruler } from "lucide-react";

const topics = [
  {
    icon: <X className="w-6 h-6" />,
    title: "Multiplication Basics",
    progress: 10,
    completed: true,
    details: [
      "Introduction to multiplication as repeated addition",
      "Learning multiplication tables (up to 5)"
    ]
  },
  {
    icon: <DivideSquare className="w-6 h-6" />,
    title: "Division Basics",
    progress: 10,
    completed: true,
    details: [
      "Introduction to division as sharing",
      "Division problems with simple numbers"
    ]
  },
  {
    icon: <PieChart className="w-6 h-6" />,
    title: "Fractions",
    progress: 10,
    completed: true,
    details: [
      "Introduction to halves, thirds, and quarters",
      "Visualizing fractions with objects"
    ]
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Time & Calendars",
    progress: 10,
    completed: true,
    details: [
      "Reading clocks (to the nearest 5 minutes)",
      "Understanding days, weeks, months, and seasons"
    ]
  },
  {
    icon: <Ruler className="w-6 h-6" />,
    title: "Measurement",
    progress: 0,
    completed: false,
    details: [
      "Introduction to basic units of measurement (length, weight)",
      "Simple comparison of lengths and weights"
    ]
  }
];

const Class3MathsProgress: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Class III Maths</h1>
      <h2 className="text-xl mb-6">Dive into Multiplication and Division Challenges</h2>
      
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

export default Class3MathsProgress;