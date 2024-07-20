import React, { createContext, useState, useEffect } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const getInitialDarkMode = () => localStorage.getItem('darkMode') === 'true';

  const [progress, setProgress] = useState(0);
  const [data, setData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setDarkMode] = useState(getInitialDarkMode);
  const [repoData, setRepoData] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [chartMilestones, setChartMilestones] = useState([]);
  const [languages, setLanguages] = useState({});
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <Context.Provider value={{
      progress, setProgress,
      data, setData,
      tagData, setTagData,
      projectsData, setProjectsData,
      isSidebarOpen, setSidebarOpen,
      searchQuery, setSearchQuery,
      isDarkMode, setDarkMode,
      repoData, setRepoData,
      contributors, setContributors,
      milestones, setMilestones,
      chartMilestones, setChartMilestones,
      languages, setLanguages,
      showChatbot, setShowChatbot,
    }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
