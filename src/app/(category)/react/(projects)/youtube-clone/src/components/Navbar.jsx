import React from 'react'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { logo } from '../utils/constants'
import Searchbar from './Searchbar'

const Navbar = () => {
  return (
    <div>
      <Stack direction="row" 
        alignItems="center" 
        p={2} 
        sx={{position: 'sticky', background: '#000', top: 0, justifyContent: 'space-between'}}
      >
        <Link to={"/"} style={{display:'flex', alignItems: 'center'}} >
          <img src={logo} alt="logo" height={45} />
        </Link>

        <Searchbar />
      </Stack>
    </div>
  )
}

export default Navbar