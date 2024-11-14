import React from 'react'
import { Stack } from '@mui/material'
import { categories } from '../utils/constants'

const Sidebar = ({selected, setSelected}) => {
  return (
    <Stack direction='row' sx={{overflowX:'auto', height: { sx:'auto', md:'90%'}, flexDirection: {md:'column' }}}>
        {categories.map((category)=>(
            <button className='category-btn'
                onClick={() => setSelected(category.name)}
                style={{background: category.name === selected && "#FC1503", color: 'white'}}
                key={category.name}
            >
                <span style={{color: category.name === selected ? 'white' : 'red', marginRight:'12px'}}>{category.icon}</span>
                <span style={{opacity: category.name === selected ? '1' : '0.8'}}>{category.name}</span>
            </button>
        ))}
    </Stack>
  )
}

export default Sidebar