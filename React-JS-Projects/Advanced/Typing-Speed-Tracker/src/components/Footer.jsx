import React, { useState } from 'react'
import Select from 'react-select';
import { themeOptions } from '../utils/themeOptions';
import { useTheme } from '../context/ThemeContext';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';

function Footer() {
  const {theme, setTheme} = useTheme();

  const handleChange = (e) => {
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  }
  return (
    <div className='footer'>
      <div className="links" style={{color: theme.title}}>
        <p>Created By: Prajyot Tayde</p>
        <div className="icons" style={{display: 'flex', marginLeft: '30px'}}>
          <div className="hoverable">
            <a href='https://www.linkedin.com/in/prajyot-tayde/' target='_blank'><LinkedInIcon style={{margin: '10px'}}/></a>
          </div>
          <div className="hoverable">
            <a href='https://github.com/Prajyot05' target='_blank'><GitHubIcon style={{margin: '10px'}}/></a>
          </div>
          <div className="hoverable">
            <a href='https://x.com/Prajyot_Tayde' target='_blank'><XIcon style={{margin: '10px'}}/></a>
          </div>
        </div>
      </div>
      <div className="themeButton">
      <Select
        onChange={handleChange}
        options={themeOptions}
        menuPlacement='top'
        defaultValue={{label: theme.label || 'Plain Dark', value: theme}}
        styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          ...theme,
          width: '10vw',
          color: 'white',
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
          ...theme,
          scrollBehavior: 'smooth',
          cursor: 'pointer'
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          ...theme,
          color: !state.isFocused ? theme.title : theme.typeBoxText,
          scrollBehavior: 'smooth',
          cursor: 'pointer'
        }),
  }}
      />
      </div>
    </div>
  )
}

export default Footer