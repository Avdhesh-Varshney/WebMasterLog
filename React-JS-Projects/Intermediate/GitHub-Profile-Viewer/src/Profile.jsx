import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaStar, FaCodeBranch, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import axios from 'axios';
import {filterRepos, Info } from './Utils';

const Profile = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState(repos);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('newest');
  const [totalPages, setTotalPages] = useState(true);
  const [loading, setloading] = useState(false)
  const [error, setError] = useState(false)
  const perPage = 30;

  const fetchProfile = async () => {
    setloading(true)
    try {
      const profileResponse = await axios.get(`https://api.github.com/users/${username}`);
      const pages = Math.floor((profile?.public_repos/perPage)+1)
      setTotalPages(pages)
      setError(false)
      setProfile(profileResponse.data);
    } catch (error) {
      setError(true)
      console.error('Error fetching profile data:', error);
    } finally {
      setloading(false)
    }
  };

  const fetchRepos = async () => {
    if (!page===totalPages) return;

    try {
      setloading(true)
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            per_page: perPage,
            page: page,
          },
        }
      );
      setError(false)
      setRepos((prevRepos) => [...reposResponse.data]);
    } catch (error) {
      setError(true)
      console.error('Error fetching repositories:', error);
    } finally {
      setloading(false)
    }
  };

  useEffect(() => {
    setProfile(null)
    setRepos([])
    setPage(1)
    setSortOption('newest')
    fetchProfile();
  }, [username]);

  useEffect(() => {
    fetchRepos();
  }, [username, page]);

  useEffect(() => {
    setFilteredRepos(filterRepos(filter, sortOption, repos));
  }, [repos, filter, sortOption])

  if (loading) return <Info message="Loading..." />
  else if (error) return <Info message="Unable to fetch data right now. Please try again later!" />

  return (
    <div className="mt-5">
      {profile && <ProfileCard profile={profile} />}

      <FilterCard filter={filter} sortOption={sortOption} page={page} hasMore={page!==totalPages} setFilter={setFilter} setSortOption={setSortOption} setPage={setPage}/>

      <ReposList filteredRepos={filteredRepos} />
    </div>
  );
};

export default Profile;



function ProfileCard({ profile }) {
  return <div className="mb-4 p-4 border rounded shadow-md text-center">
    <h1 className="text-2xl font-bold flex gap-3 items-center justify-center">
      <img src={profile.avatar_url} className='h-8 w-8 rounded-full border-2 border-grey-500' />
      {profile.name}
    </h1>
    <p className="my-2">{profile.bio}</p>
    <p>{profile.followers} Followers | {profile.following} Following</p>
    <a
      href={profile.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-block text-blue-300 underline hover:text-blue-500"
    >
      View Profile
    </a>
  </div>
}

function FilterCard({ filter, sortOption, page, hasMore, setFilter, setSortOption, setPage }) {
  return <div className='flex gap-2'>
            <div className="mb-3">
              <input
                type="text"
                className="p-2 border rounded w-full text-sm"
                placeholder="Search repositories"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className="mb-3 mr-auto">
              <select
                className="p-2 border rounded w-full text-sm"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="most_stars">Most Stars</option>
                <option value="most_forks">Most Forks</option>
              </select>
            </div>

            <div className='flex items-center h-full gap-2'>
              <button
                onClick={() => setPage((prevPage) => prevPage - 1)}
                className='p-3 bg-black rounded disabled:opacity-20 disabled:pointer-events-none'
                disabled={page === 1}
              ><FaAngleLeft /></button>
              <button
                onClick={() => setPage((prevPage) => prevPage + 1)}
                className='p-3 bg-black rounded disabled:opacity-20 disabled:pointer-events-none'
                disabled={!hasMore}
              ><FaAngleRight /></button>
            </div>
         </div>
}

function ReposList({filteredRepos}) {
  return <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 '>
            {filteredRepos.map(repo => <RepoCard repo={repo}/>)}
         </div>
}

function RepoCard({repo}) {
  return <div className="mb-2 p-4 border rounded shadow-white shadow-sm hover:shadow-sm" key={repo.id}>
            <h5 className="text-xl font-bold">{repo.name}</h5>
            <p className="mt-2 text-sm text-gray-300">{repo.description}</p>
            <p className="mt-2 text-sm text-gray-400">Last updated on: {repo.created_at.split("T")[0]}</p>
            <div className="flex space-x-4 mt-2 items-center">
              <span className='flex items-center gap-1'><FaStar size={15} /> {repo.stargazers_count}</span>
              <span className='flex items-center gap-1'><FaCodeBranch size={15} /> {repo.forks_count}</span>
              <span>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-gray-600"
                >
                  <FaExternalLinkAlt size={15} />
                </a>
              </span>
            </div>

         </div>
}
