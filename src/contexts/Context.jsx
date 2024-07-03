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
      isDarkMode, setDarkMode
    }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
