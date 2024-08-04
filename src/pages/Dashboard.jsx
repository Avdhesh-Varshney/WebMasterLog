import React, { useContext } from 'react';
import { Context } from '../contexts/Context';

// Importing chart elements
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

// Importing Icons
import { FaProjectDiagram, FaBell, FaUsers, FaGithub, FaStar, FaCode, FaDatabase } from 'react-icons/fa';
import { FaCodeFork } from 'react-icons/fa6';
import { DiMitlicence } from "react-icons/di";

const truncateDescription = (description) => {
  const words = description.split(' ');
  const contentLimit = 10;
  if (words.length > contentLimit) {
    return words.slice(0, contentLimit).join(' ') + '...';
  }
  return description;
};

const calculateLanguagePercentage = (langData) => {
  const total = Object.values(langData).reduce((acc, value) => acc + value, 0);
  return Object.keys(langData).map(key => ({
    name: key,
    percentage: ((langData[key] / total) * 100).toFixed(2)
  }));
};

const Dashboard = () => {
  const { data, repoData, contributors, milestones, chartMilestones, languages } = useContext(Context);

  const milestonesChartData = {
    labels: chartMilestones.map(milestone => milestone.title),
    datasets: [{
      data: chartMilestones.map(milestone => milestone.total_issues),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#C9CBCF',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#C9CBCF',
      ]
    }]
  };
  const milestonesChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#fff'
        }
      }
    }
  };

  return (
    <div className='d-flex flex-column my-5 gap-3'>
      {repoData && data && (
        <>

          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-md-4 text-center'>
                <a href={repoData.owner.html_url} target='_blank' rel='noopener noreferrer'>
                  <img src='/logo.webp' alt={`${repoData.owner.login} avatar`} className='img-thumbnail rounded-circle' style={{ width: '13em' }} />
                </a>
              </div>
              <div className='col-md-8'>
                <div className='d-flex flex-column'>
                  <h1 className='mb-2 text-center text-md-start'>Welcome to <span style={{ color: 'rgb(13,202,240)' }}>{repoData.name}</span> Project</h1>
                  <p className='text-center text-md-start'>{repoData.description}</p>
                  <p className='text-center text-md-start'>This project is designed by <span style={{ color: 'rgb(13,202,240)' }}>{repoData.owner.login}</span>.</p>
                  <a href={repoData.html_url} target='_blank' rel='noopener noreferrer' className='align-self-center align-self-md-start'>
                    <button variant='secondary' className='btn btn-dark mb-2'><FaGithub /> Repository</button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row mb-4 g-2">
              <div className="col-md-6 col-lg-3">
                <div className="card text-center" style={{ backgroundColor: '#12151e', color: '#fff' }}>
                  <div className="card-body">
                    <FaProjectDiagram size={50} />
                    <h5 className="card-title">Total Projects</h5>
                    <p className="card-text" style={{ color: 'rgb(13,202,240)' }}>{data.length - 1}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card text-center" style={{ backgroundColor: '#12151e', color: '#fff' }}>
                  <div className="card-body">
                    <FaStar size={50} />
                    <h5 className="card-title">Total Stars</h5>
                    <p className="card-text" style={{ color: 'rgb(13,202,240)' }}>{repoData.stargazers_count}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card text-center" style={{ backgroundColor: '#12151e', color: '#fff' }}>
                  <div className="card-body">
                    <FaCodeFork size={50} />
                    <h5 className="card-title">Total Forks</h5>
                    <p className="card-text" style={{ color: 'rgb(13,202,240)' }}>{repoData.forks_count}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card text-center" style={{ backgroundColor: '#12151e', color: '#fff' }}>
                  <div className="card-body">
                    <FaBell size={50} />
                    <h5 className="card-title">Open Issues</h5>
                    <p className="card-text" style={{ color: 'rgb(13,202,240)' }}>{repoData.open_issues_count}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card text-center" style={{ backgroundColor: '#12151e', color: '#fff' }}>
                  <div className="card-body">
                    <FaUsers size={50} />
                    <h5 className="card-title">Contributors</h5>
                    <p className="card-text" style={{ color: 'rgb(13,202,240)' }}>{contributors.length}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card text-center" style={{ backgroundColor: '#12151e', color: '#fff' }}>
                  <div className="card-body">
                    <DiMitlicence size={50} />
                    <h5 className="card-title">License</h5>
                    <p className="card-text" style={{ color: 'rgb(13,202,240)' }}>{repoData.license.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card text-center" style={{ backgroundColor: '#12151e', color: '#fff' }}>
                  <div className="card-body">
                    <FaCode size={50} />
                    <h5 className="card-title">Most Used Language</h5>
                    <p className="card-text" style={{ color: 'rgb(13,202,240)' }}>{repoData.language}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="card text-center" style={{ backgroundColor: '#12151e', color: '#fff' }}>
                  <div className="card-body">
                    <FaDatabase size={50} />
                    <h5 className="card-title">Repo Size</h5>
                    <p className="card-text" style={{ color: 'rgb(13,202,240)' }}>{(repoData.size / 1024.0).toFixed(2)} MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">

              <div className="col-md-6">
                <div className="card" style={{ backgroundColor: '#12151e', color: '#fff', height: '400px' }}>
                  <div className="card-header">Languages</div>
                  <ul className="list-group list-group-flush">
                    {calculateLanguagePercentage(languages).map((lang, index) => (
                      <li key={index} className="list-group-item" style={{ backgroundColor: '#12151e', color: '#fff' }}>
                        <div className="row">
                          <div className="col-md-4">
                            <h5>{lang.name}</h5>
                          </div>
                          <div className="col-md-8">
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${lang.percentage}%` }}
                                aria-valuenow={lang.percentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {`${lang.percentage}%`}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card" style={{ backgroundColor: '#12151e', color: '#fff', height: '400px' }}>
                  <div className="card-header">Milestones Progress</div>
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <div style={{ position: 'relative', height: '300px', width: '300px' }}>
                      <Pie data={milestonesChartData} options={milestonesChartOptions} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="container">
            <h2 className="text-center">Milestones</h2>
            <div className="row row-cols-1 row-cols-md-3 mt-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="col mb-4">
                  <div className="card" style={{ backgroundColor: '#12151e', color: '#fff' }}>
                    <div className="card-header text-center">{milestone.title}</div>
                    <div className="card-body">
                      <p className="card-text">{truncateDescription(milestone.description)}</p>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${Math.round((milestone.closed_issues / (milestone.closed_issues + milestone.open_issues)) * 100)}%` }}
                          aria-valuenow={milestone.closed_issues}
                          aria-valuemin="0"
                          aria-valuemax={milestone.closed_issues + milestone.open_issues}
                        >
                          {`${Math.round((milestone.closed_issues / (milestone.closed_issues + milestone.open_issues)) * 100)}%`}
                        </div>
                      </div>
                      <p className="mt-2">
                        {`${milestone.closed_issues} closed / ${milestone.closed_issues + milestone.open_issues} total`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="container">
            <h1 className="text-center mb-4">Our Valuable Contributors</h1>
            <div className="d-flex flex-wrap justify-content-center">
              {contributors.map((contributor, index) => (
                <div key={index} className="contributor-card mx-2 my-3" style={{ width: '65px', height: '65px', clipPath: 'polygon(50% 0%, 91% 25%, 91% 75%, 50% 100%, 9% 75%, 9% 25%)' }}>
                  <a href={contributor.html_url}>
                    <img src={contributor.avatar_url} alt={contributor.login} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default Dashboard;
