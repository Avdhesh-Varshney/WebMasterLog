
import './App.css'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import React from 'react';


const scoreDescriptions = {
  'No Hire': 'Significant deficiencies in key areas. Does not meet minimum requirements.',
  'Weak Consideration': 'Shows some potential but has noticeable weaknesses. May need further review.',
  'Neutral': 'Meets basic qualifications but does not stand out. Balanced mix of strengths and weaknesses.',
  'Consider': 'Strong contender with solid skills and good cultural fit. Minor areas for improvement.',
  'Strong Hire': 'Exceptional candidate exceeding expectations. Highly recommended for hire.'
};

const getHireRecommendation = (score) => {
  if (score <= 2) return 'No Hire';
  if (score <= 4) return 'Weak Consideration';
  if (score <= 6) return 'Neutral';
  if (score <= 8) return 'Consider';
  return 'Strong Hire';
};

const SkillTable = ({ skills }) => (
  <div className="overflow-x-auto mb-6">
    <table className="min-w-full bg-gray-800 text-white">
      <thead>
        <tr className="bg-gray-700">
          {Object.keys(skills[0]).map((key, index) => (
            <th key={index} className="px-4 py-2 text-left">{key.charAt(0).toUpperCase() + key.slice(1)}</th>
          ))}
          <th className="px-4 py-2 text-left">Recommendation</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
            {Object.entries(skill).map(([key, value], valueIndex) => (
              <td key={valueIndex} className="px-4 py-2">
                {key === 'score' ? `${value}/10` : value}
              </td>
            ))}
            <td className="px-4 py-2">{getHireRecommendation(skill.score)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SkillRadar = ({ skills }) => (
  <ResponsiveContainer width="100%" height={400}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
      <PolarGrid stroke="#555" />
      <PolarAngleAxis dataKey="skill" stroke="#888" />
      <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#888" />
      <Radar name="Score" dataKey="score" stroke="#00a8e8" fill="#00a8e8" fillOpacity={0.6} />
      <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
    </RadarChart>
  </ResponsiveContainer>
);

const OverallComparison = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#555" />
      <XAxis dataKey="category" stroke="#888" />
      <YAxis domain={[0, 10]} stroke="#888" />
      <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
      <Legend />
      <Bar dataKey="score" fill="#00a8e8" />
    </BarChart>
  </ResponsiveContainer>
);

const ScoreDescriptions = () => (
  <div className="mt-6 p-4 bg-gray-800 rounded">
    <h4 className="text-lg font-semibold mb-2 text-blue-400">Score Descriptions</h4>
    {Object.entries(scoreDescriptions).map(([key, value], index) => (
      <p key={index} className="mb-2">
        <span className="font-bold">{key}:</span> {value}
      </p>
    ))}
  </div>
);

const IntroCard = ({ title, value }) => {
  return (
    <div className='flex flex-col mb-2 bg-gray-800 min-w-[250px] p-4 rounded-lg'>
      <h3 className="text-xl font-semibold text-blue-400">{title}</h3>
      <p className="text-gray-4000">{value}</p>
    </div>
  )
}

function App() {

  const problemSolvingSkills = [
    { skill: 'Algorithm Design', score: 8, comments: 'Strong grasp of fundamental algorithms, room for improvement in advanced techniques' },
    { skill: 'Data Structures', score: 9, comments: 'Exceptional understanding and application of various data structures' },
    { skill: 'Debugging', score: 7, comments: 'Methodical approach, could improve speed in complex scenarios' },
    { skill: 'Performance Optimization', score: 6, comments: 'Good understanding, needs more experience with advanced optimization techniques' },
  ];

  const javascriptSkills = [
    { skill: 'Core JavaScript', score: 9, comments: 'Excellent understanding of JS fundamentals and advanced concepts' },
    { skill: 'ES6+ Features', score: 8, comments: 'Proficient with modern JS features, could deepen knowledge of newer proposals' },
    { skill: 'Asynchronous JS', score: 7, comments: 'Strong grasp of promises and async/await, room for improvement in complex async patterns' },
    { skill: 'Functional Programming', score: 6, comments: 'Good understanding of core concepts, could improve on advanced techniques' },
    { skill: 'DOM Manipulation', score: 8, comments: 'Excellent knowledge of working with the DOM, including performance considerations' },
    { skill: 'Web APIs', score: 7, comments: 'Strong familiarity with common Web APIs, could explore more specialized APIs' },
  ];

  const reactSkills = [
    { skill: 'Component Lifecycle', score: 9, comments: 'Excellent understanding of both class and functional component lifecycles' },
    { skill: 'Hooks', score: 8, comments: 'Proficient with common hooks, room for improvement with custom hooks' },
    { skill: 'State Management', score: 7, comments: 'Strong grasp of local state and context API, could improve on global state solutions' },
    { skill: 'Performance Optimization', score: 6, comments: 'Good understanding of memoization, can improve on advanced techniques like code splitting' },
    { skill: 'React Patterns', score: 8, comments: 'Strong knowledge of common React patterns and best practices' },
    { skill: 'Testing', score: 7, comments: 'Solid foundation with Jest and React Testing Library, could improve on integration and E2E testing' },
  ];

  const behavioralSkills = [
    { skill: 'Communication', score: 9, comments: 'Excellent verbal and written communication, articulates complex ideas clearly' },
    { skill: 'Teamwork', score: 8, comments: 'Collaborates well, contributes positively to team dynamics' },
    { skill: 'Time Management', score: 7, comments: 'Good at prioritizing tasks, occasionally struggles with estimating complex tasks' },
    { skill: 'Adaptability', score: 8, comments: 'Quick to adapt to new technologies and methodologies' },
    { skill: 'Leadership', score: 6, comments: 'Shows potential, could benefit from more opportunities to lead projects' },
    { skill: 'Continuous Learning', score: 8, comments: 'Proactive in seeking new knowledge, stays updated with industry trends' },
  ];

  const overallComparison = [
    { category: 'Problem Solving', score: problemSolvingSkills.reduce((sum, skill) => sum + skill.score, 0) / problemSolvingSkills.length },
    { category: 'JavaScript', score: javascriptSkills.reduce((sum, skill) => sum + skill.score, 0) / javascriptSkills.length },
    { category: 'React', score: reactSkills.reduce((sum, skill) => sum + skill.score, 0) / reactSkills.length },
    { category: 'Behavioral', score: behavioralSkills.reduce((sum, skill) => sum + skill.score, 0) / behavioralSkills.length },
  ];

  return (
    <div className=''>
      <div className="bg-gray-900 text-white p-6 rounded-lg max-w-4xl mx-auto ">
        {/* <h2 className="text-2xl font-bold mb-6 text-blue-400">Frontend Software Engineering Skills Assessment</h2> */}

        {/* <ScoreDescriptions /> */}

        <div>
          <h1 className="text-2xl font-bold mb-6 text-blue-400 text-center">Uppply's Interview Report</h1>
          <h3 className="text-gray-400 text-right text-sm">Generated on Tuesday, 25 June 2024</h3>

          <div className='flex flex-col w-full my-6'>
            <div className='flex w-full justify-between'>
              <IntroCard title="Candidate Name" value="Ravi Patel" />
              <IntroCard title="Position Applied For" value="Frontend Engineer" />
            </div>
            <div className='flex w-full justify-between'>
              <IntroCard title="Email" value="ravi@gmail.com" />
              <IntroCard title="Phone Number" value="+91 53424xxxx" />
            </div>
          </div>
        </div>

        {/* line */}
        <div className='w-full h-[1px] bg-gray-700 my-6'></div>

        <h3 className="text-xl font-semibold mb-4 text-blue-400">Overall Skill Comparison</h3>
        <OverallComparison data={overallComparison} />

        <div className='w-full h-[1px] bg-gray-700 my-6'></div>


        <h3 className="text-xl font-semibold mb-4 mt-6 text-blue-400">Problem Solving Skills</h3>
        <SkillTable skills={problemSolvingSkills} />
        <SkillRadar skills={problemSolvingSkills} />

        <div className='w-full h-[1px] bg-gray-700 my-6'></div>


        <h3 className="text-xl font-semibold mb-4 text-blue-400">JavaScript Skills</h3>
        <SkillTable skills={javascriptSkills} />
        <SkillRadar skills={javascriptSkills} />

        <div className='w-full h-[1px] bg-gray-700 my-6'></div>


        <h3 className="text-xl font-semibold mb-4 text-blue-400">React Skills</h3>
        <SkillTable skills={reactSkills} />
        <SkillRadar skills={reactSkills} />

        <div className='w-full h-[1px] bg-gray-700 my-6'></div>


        <h3 className="text-xl font-semibold mb-4 text-blue-400">Behavioral Skills</h3>
        <SkillTable skills={behavioralSkills} />
        <SkillRadar skills={behavioralSkills} />


      </div>
    </div>
  )
}

export default App
