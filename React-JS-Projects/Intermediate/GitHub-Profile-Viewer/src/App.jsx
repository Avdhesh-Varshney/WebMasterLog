import React, { useState } from 'react';
import './index.css';
import Profile from './Profile';

const App = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedUsername(username);
  };

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-center text-3xl font-bold mb-4">GitHub Profile Viewer</h1>
      <form onSubmit={handleSubmit} className="mb-4 w-full flex justify-center">
        <div className="flex sm:w-full lg:w-1/3">
          <input
            type="text"
            className="p-2 border rounded w-full"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded">Search</button>
        </div>
      </form>
      {submittedUsername && <Profile username={submittedUsername} />}
    </div>
  );
};

export default App;
