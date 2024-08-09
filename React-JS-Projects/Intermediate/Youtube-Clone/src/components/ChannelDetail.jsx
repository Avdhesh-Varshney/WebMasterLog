import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const  ChannelDetail = () => {

  const { id } = useParams();
  const [data, setData] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data)=> setData(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data)=> setVideos(data?.items))
  }, [id])
  

  return (
    <Box height={'95vh'} sx={{overflowY: 'auto'}}>
      <Box>
        <div style={{ background: `linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(236,3,184,1) 100%, rgba(0,212,255,1) 100%) `, height: '200px', zIndex: '10'}} />

        <ChannelCard channelDetail={data} marginTop='-100px'/>

      </Box>
      <Box display='flex' p='2'>
        <Box sx={{mr: {sm: '100px'}}} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail