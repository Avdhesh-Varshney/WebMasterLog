import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Sidebar from './Sidebar'
import Videos from './Videos'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const Feed = () => {

  const [selected, setSelected] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selected}`).then((data)=>{
      setVideos(data.items)
    })
  }, [selected]);
  

  return (
    <Stack sx={{flexDirection: {sm: 'column', md: 'row'}}}>
      <Box sx={{height: {sx: 'auto', md:'90vh'}, borderRight:'1px solid #3d3d3d', px:{ sx:0, md:2}}}>
        <Sidebar 
          selected = {selected}
          setSelected = {setSelected}
        />
        <Typography className='copyright' variant='body2' sx={{mt: 1.5, color: '#fff'}}>
          Copyright 2024 Youtube Clone
        </Typography>
      </Box>

      <div>
        <Box py={2} sx={{overflowX: 'auto', height:'90vh', flex: 2, width: '100%'}}>
          <Typography variant='h4' fontWeight="bold" px={2} mb={2} sx={{color: 'white'}}>
            {selected} <span style={{color: "#f31503"}}>videos</span>
          </Typography>

          <Videos videos={videos} />
        </Box>
      </div>
    </Stack>
  )
}

export default Feed