import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import Bg from "../assets/mathsbg.jpeg";

//svgs
import NumberIcon from "../assets/svgs/NumberSense&Operations.svg";
import MultiplicationIcon from "../assets/svgs/Multiplication&Division.svg";
import FractionsIcon from "../assets/svgs/Fractions&Decimals.svg";
import GeometryIcon from "../assets/svgs/Geometry&Measurement.svg";
import TimeIcon from "../assets/svgs/Time&Money.svg";
import DataIcon from "../assets/svgs/Data&Graphs.svg";

const topics = [
  {
    icon: <img src={NumberIcon} alt="Number Sense & Operations" />,
    title: "Number Sense & Operations",
    description: "Build a Strong Foundation in Numbers",
    path: "/Topic/Addition",
    color: "text-blue-500",
  },
  {
    icon: <img src={MultiplicationIcon} alt="Multiplication & Division" />,
    title: "Multiplication & Division",
    description: "Master Multiplication and Division Skills",
    color: "text-green-500",
  },
  {
    icon: <img src={FractionsIcon} alt="Fractions & Decimals" />,
    title: "Fractions & Decimals",
    description: "Understanding Parts of a Whole",
    color: "text-purple-500",
  },
  {
    icon: <img src={GeometryIcon} alt="Geometry & Measurement" />,
    title: "Geometry & Measurement",
    description: "Explore Shapes and Measurements",
    color: "text-yellow-500",
  },
  {
    icon: <img src={TimeIcon} alt="Time & Money" />,
    title: "Time & Money",
    description: "Learn to Manage Time and Money",
    color: "text-red-500",
  },
  {
    icon: <img src={DataIcon} alt="Data & Graphs" />,
    title: "Data & Graphs",
    description: "Analyzing Information Through Data",
    color: "text-orange-500",
  },
];

const Home: React.FC = () => {
  const divStyle: React.CSSProperties = {
    backgroundImage: `url(${Bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "80vh",
    width: "100%",
    position: "relative",
    overflow: "hidden",
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto gap-20 max-h-full max-w-full"
    >
      <div
        className="text-center mb-12 px-4 md:px-8 lg:px-16 flex items-center justify-center"
        style={divStyle}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-zinc-800 opacity-60 lg:opacity-75"></div>

        <div className="relative">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-semibold mb-4 text-white text-left">
            Master Maths with Fun & Ease!
          </h2>
          <div className="pt-2"></div>
          <p className="text-lg md:text-2xl lg:text-4xl font-normal mb-6 text-white text-justify">
            Interactive practice exercises designed for students in grades 1 to
            5. Learn at your own pace and build strong math skills.
          </p>
          <div className="pt-4"></div>
          <Button
            radius="sm"
            variant="shadow"
            className="flex justify-start text-xl font-medium bg-purple-600 text-white shadow-m px-12 py-6 md:px-12 md:py-6"
          >
            Start Practicing
          </Button>
        </div>
      </div>

      <div className="mb-8 px-4 md:px-8 lg:px-20">
        <h2 className="text-2xl font-medium text-zinc-800">Featured Topics</h2>
        <h3 className="text-xl font-normal text-zinc-600">
          Start Building Your Math Foundation!
        </h3>
      </div>
      <div className="mb-8 px-4 md:px-8 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
          {topics.map((topic, index) => (
            <Card isHoverable key={index} className="h-full px-2 py-2">
              <CardBody>
                <div className="flex flex-row gap-2 items-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-4xl font-bold pb-3 bg-transparent">
                    {topic.icon}
                  </div>
                  <p className={`text-xl sm:text-2xl font-medium px-2 ${topic.color}`}>
                    {topic.title}
                  </p>
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

      <footer className="mt-12 text-center">
        <p className="text-sm">© 2024 Maths</p>
      </footer>
    </motion.div>
  );
};

export default Home;
