import React, { useEffect, useState } from 'react';
import { Card, CardBody, Input, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Search, ArrowUpDown } from 'lucide-react';

interface ClassProgress {
  name: string;
  progress: number;
  icon: string;
}

const initialClassProgress: ClassProgress[] = [
  { name: 'Class I Maths', progress: 0, icon: '✖' },
  { name: 'Class II Maths', progress: 60, icon: '◎' },
  { name: 'Class III Maths', progress: 50, icon: '✂' },
  { name: 'Class IV Maths', progress: 50, icon: '🖋' },
  { name: 'Class V Maths', progress: 40, icon: '📐' },
];

const topicProgress = [
  { topic: 'Multiplying & Dividing Large Numbers', class: 'Class 5', correct: '5/5', incorrect: '0/5', timeElapsed: 4, score: 100 },
  { topic: 'Geometry', class: 'Class 4', correct: '4/5', incorrect: '1/5', timeElapsed: 5, score: 80 },
  { topic: 'Division Basics', class: 'Class 3', correct: '3/5', incorrect: '2/5', timeElapsed: 6, score: 60 },
  { topic: 'Advanced Subtraction', class: 'Class 2', correct: '2/5', incorrect: '3/5', timeElapsed: 7, score: 40 },
  { topic: 'Shapes & Patterns', class: 'Class 1', correct: '1/5', incorrect: '4/5', timeElapsed: 8, score: 20 },
];

const ProgressOverview: React.FC = () => {
  const [classProgress, setClassProgress] = useState<ClassProgress[]>(initialClassProgress);

  useEffect(() => {
    const classOneProgress = JSON.parse(localStorage.getItem('classOneProgress') || '{}');
    const classOneAverageProgress = classOneProgress.averageProgress || 0;

    setClassProgress(prevProgress => 
      prevProgress.map(item => 
        item.name === 'Class I Maths' 
          ? { ...item, progress: classOneAverageProgress } 
          : item
      )
    );
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-2 text-purple-600">Progress Overview</h1>
      <p className="text-gray-600 mb-6">Track your progress across all classes</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {classProgress.map((item) => (
          <Card isPressable isHoverable key={item.name} className="shadow-lg">
            <CardBody className="p-4">
              <div className="flex items-center justify-start gap-4 ml-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xl font-medium">{item.name}</span>
              </div>
              <p className="text-lg font-bold items-center justify-between ml-11 mt-2" style={{color: `hsl(${item.progress}, 70%, 50%)`}}>
                {item.progress.toFixed(2)}% Complete
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <Input
            startContent={<Search className="text-gray-400" />}
            placeholder="Search"
            className="max-w-xs"
          />
          <Button
            endContent={<ArrowUpDown className="h-4 w-4" />}
            variant="flat"
          >
            Sort by
          </Button>
        </div>
        
        <Table aria-label="Progress table" className="mt-4">
          <TableHeader>
            <TableColumn className="text-purple-600">Topic Name</TableColumn>
            <TableColumn className="text-purple-600">Class</TableColumn>
            <TableColumn className="text-purple-600">Correct</TableColumn>
            <TableColumn className="text-purple-600">Incorrect</TableColumn>
            <TableColumn className="text-purple-600">Time Elapsed</TableColumn>
            <TableColumn className="text-purple-600">Score</TableColumn>
          </TableHeader>
          <TableBody>
            {topicProgress.map((item) => (
              <TableRow key={item.topic}>
                <TableCell>{item.topic}</TableCell>
                <TableCell>{item.class}</TableCell>
                <TableCell className="text-green-600">{item.correct}</TableCell>
                <TableCell className="text-red-600">{item.incorrect}</TableCell>
                <TableCell>{item.timeElapsed} mins</TableCell>
                <TableCell>
                  <span className="font-bold" style={{color: `hsl(${item.score}, 70%, 50%)`}}>
                    {item.score}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <footer className="mt-8 text-center text-gray-500">
        © 2024 Maths
      </footer>
    </div>
  );
};

export default ProgressOverview;