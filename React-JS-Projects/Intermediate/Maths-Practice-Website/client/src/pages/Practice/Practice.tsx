import React from "react";
import { motion } from "framer-motion";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  PencilRuler,
  Cog,
  Scissors,
  Glasses,
  Footprints,
  SearchCheck,
} from "lucide-react";

// Interfaces
interface ClassItem {
  icon: React.ReactNode;
  class: string;
  title: string;
  path: string;
  color: string;
  buttonBg: string;
}

interface TopicItem {
  icon: string;
  title: string;
  description: string;
  path: string;
}

// Class Component
const PracticeByClass: React.FC = () => {
  const navigate = useNavigate();

  const classes: ClassItem[] = [
    {
      icon: <PencilRuler className="w-6 h-6 text-blue-500" />,
      class: "Class I",
      title: "Introduction to Basic Math Skills",
      path: "/Class/ClassOne",
      color: "text-blue-500",
      buttonBg: "bg-blue-500 bg-opacity-35 text-blue-500",
    },
    {
      icon: <Cog className="w-6 h-6 text-yellow-500" />,
      class: "Class II",
      title: "Strengthen Your Skills in Addition and Subtraction",
      path: "/Class/ClassTwo",
      color: "text-yellow-500",
      buttonBg: "bg-yellow-500 bg-opacity-35 text-yellow-500",
    },
    {
      icon: <Scissors className="w-6 h-6 text-green-500" />,
      class: "Class III",
      title: "Dive into Multiplication and Division Challenges",
      path: "/Class/ClassThree",
      color: "text-green-500",
      buttonBg: "bg-green-500 bg-opacity-35 text-green-500",
    },
    {
      icon: <Glasses className="w-6 h-6 text-orange-500" />,
      class: "Class IV",
      title: "Advance Your Math Skills with Interactive Exercises",
      path: "/Class/ClassFour",
      color: "text-orange-500",
      buttonBg: "bg-orange-500 bg-opacity-35 text-orange-500",
    },
    {
      icon: <Footprints className="w-6 h-6 text-red-500" />,
      class: "Class V",
      title: "Prepare for Future Math Concepts with Expert Practice",
      path: "/Class/ClassFive",
      color: "text-red-500",
      buttonBg: "bg-red-500 bg-opacity-35 text-red-500",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto gap-20 max-h-full max-w-full"
    >
      <div className="mb-8 px-4 md:px-8 lg:px-20">
        <div className="grid grid-cols-1 gap-4">
          {classes.map((item, index) => (
            <Card key={index} isHoverable className="h-full">
              <CardBody>
                <div className="iconAndButton flex items-center justify-between px-2">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold pb-3">
                      {item.icon}
                    </div>
                    <p className={`text-lg sm:text-xl md:text-2xl font-medium px-2 ${item.color}`}>
                      {item.class}
                    </p>
                  </div>

                  <Button
                    radius="sm"
                    variant="flat"
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center justify-start text-sm sm:text-base lg:text-m font-medium ${item.buttonBg} shadow-s px-4 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-4`}
                  >
                    View all topics
                    <ChevronRight size={20} />
                  </Button>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <p className="text-lg sm:text-xl font-normal text-zinc-600 text-start">
                  {item.title}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Topic Component
const PracticeByTopic: React.FC = () => {
  const navigate = useNavigate();

  const topics = [
    {
      icon: "+",
      title: "Addition",
      description: "Build a Strong Foundation – Add with Confidence!",
      path: "/Topic/Addition",
    },
    {
      icon: "-",
      title: "Subtraction",
      description: "Master the Art of Taking Away!",
      path: "/Topic/Subtraction",
    },
    {
      icon: "×",
      title: "Multiplication",
      description: "Multiply Your Math Skills – One Step at a Time!",
      path: "/Topic/Multiplication",
    },
    {
      icon: "÷",
      title: "Division",
      description: "Divide and Conquer – Break Down Big Problems!",
      path: "/Topic/Division",
    },
    {
      icon: "²√",
      title: "Square Roots",
      description: "Uncover the Secrets of Square Roots!",
      path: "/Topic/SquareRoots",
    },
    {
      icon: "³√",
      title: "Cube Roots",
      description: "Go Deeper – Explore Cube Roots with Ease!",
      path: "/Topic/CubeRoots",
    },
    {
      icon: "²",
      title: "Squaring",
      description: "Learn How to Square Numbers Like a Pro!",
      path: "/Topic/Squaring",
    },
    {
      icon: "³",
      title: "Cubing",
      description: "Take Math to the Next Level – Master Cubing!",
      path: "/Topic/Cubing",
    },
  ];

  const handlePractice = (path: string) => {
    navigate(path);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 gap-6"
    >
      <div className="mb-8 px-4 md:px-8 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
      {topics.map((topic, index) => (
        <Card key={index} isHoverable className="h-full px-2 py-2">
          <CardBody>
            <div className="flex flex-row gap-2 items-center">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-bold pb-3 bg-transparent">
                {topic.icon}
              </div>
              <p className="text-xl sm:text-2xl font-medium px-2">{topic.title}</p>
              <Button
                color="primary"
                variant="flat"
                size="sm"
                onClick={() => handlePractice(topic.path)}
              >
                Practice Now
              </Button>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <p className="text-xl font-normal text-zinc-600 text-start">
              {topic.description}
            </p>
          </CardFooter>
        </Card>
      ))}
        </div>
      </div>

      
    </motion.div>
  );
};

// Main Practice Component
const Practice: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8 px-4 md:px-8 lg:px-20 text-center">
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-bold pb-3">
            <SearchCheck className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-medium text-purple-600">Find the Perfect Practice for You</h2>
        </div>
        <h3 className="text-2xl font-normal text-zinc-600">
          Pick Your Class or Concentrate on Specific Topics
        </h3>
      </div>

      <div className="mb-8 px-4 md:px-8 lg:px-20">
        <Tabs aria-label="Practice Options" variant="underlined" className="pt-3 text-lg text-purple-600 mb-4 px-4 md:px-8 lg:px-20">
          <Tab key="by-class" title="Class" className="text-lg text-purple-600">
            <PracticeByClass />
          </Tab>
          <Tab key="by-topic" title="Topic" className="text-lg text-purple-600">
            <PracticeByTopic />
          </Tab>
        </Tabs>
      </div>

      <footer className="mt-12 text-center text-sm text-gray-600">
        © 2024 Maths
      </footer>
    </motion.div>
  );
};

export default Practice;
