import React from 'react';
import { motion } from "framer-motion";
import { Card, CardBody, Progress, Chip } from '@nextui-org/react';
import { X, Percent, Square, BarChart2 } from 'lucide-react';

const topics = [
  {
    icon: <X className="w-6 h-6" />,
    title: "Multiplying & Dividing Large Numbers",
    progress: 10,
    completed: true,
    details: [
      "Multiplying three-digit numbers",
      "Division with larger numbers and remainders"
    ]
  },
  {
    icon: <Percent className="w-6 h-6" />,
    title: "Fractions, Decimals & Percentages",
    progress: 10,
    completed: true,
    details: [
      "Converting between fractions, decimals, and percentages",
      "Solving problems involving percentages"
    ]
  },
  {
    icon: <Square className="w-6 h-6" />,
    title: "Area & Perimeter",
    progress: 10,
    completed: true,
    details: [
      "Calculating area and perimeter of basic shapes",
      "Applying formulas for rectangles and squares"
    ]
  },
  {
    icon: <Square className="w-6 h-6" />,
    title: "Introduction to Square Roots & Cubes",
    progress: 10,
    completed: true,
    details: [
      "Understanding square and cube numbers",
      "Simple exercises on squaring and cubing numbers"
    ]
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Introduction to Data & Graphs",
    progress: 0,
    completed: false,
    details: [
      "Reading and interpreting bar graphs and pictograms",
      "Basic data collection and analysis"
    ]
  }
];

const Class5MathsProgress: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">Class V Maths</h1>
      <h2 className="text-xl mb-6">Prepare for Future Math Concepts with Expert Practice</h2>
      
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

export default Class5MathsProgress;
