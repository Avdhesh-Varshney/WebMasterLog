import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi';

const Dashboard = ({theme,toggleTheme}) => {
	return (
		<>
		    <div className="container">
                <div className="row align-items-center">
                  <div className="col">
                    <h1 className={`text-end my-2 mx-3 title ${theme}`}>WEB MASTER LOG</h1>
                  </div>
                  <div className="col-auto theme" onClick={toggleTheme}>
                    <div>
                      {theme === 'light' ? (
                        <FiMoon style={{ color: 'black', fontSize: '28px' }} />
                      ) : (
                        <FiSun style={{ color: 'yellow', fontSize: '28px' }} />
                      )}
                    </div>
                  </div>
                </div>
            </div>
		</>
	)
}

export default Dashboard
