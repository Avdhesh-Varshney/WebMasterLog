import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Box, Typography, Stack } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { Videos } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'


const VideoDetail = () => {

  const [data, setData] = useState(null)
  const [suggested, setSuggested] = useState([])
  const {id} = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data)=>setData(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data)=>setSuggested(data.items))
  }, [id])

  if(!data?.snippet) return 'Loading'

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount} } = data;
  
  return (
    <Box height='100%' sx={{overflowY: 'auto'}} px={2}>
      <Stack direction={{xs:'column', md:'row'}}>
        <Box flex={1}>
          <Box sx={{width: '100%', position: 'sticky', top:'0px'}}>
            <Box>
              <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            </Box>
            <Typography color={"#fff"} variant='h5' fontWeight="bold" px={2} pt={2}>
              {title}
            </Typography>

            <Stack direction={'row'} justifyContent={'space-between'} sx={{color: '#fff'}} py={{xs: 2, sm:1}} px={2} >
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{sm: 'subtitle1', md: 'h6'}} color={'#fff'}>
                  {channelTitle}
                  <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}} />
                </Typography>
              </Link>

              <Stack direction={'row'} gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{opacity: 0.7}}>
                  {parseInt(viewCount).toLocaleString()} Views
                </Typography>
                <Typography variant='body1' sx={{opacity: 0.7}}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>

            </Stack>

          </Box>
        </Box>

        <Box pl={{ xs: 0, sm:2 }} py={{md:0, xs:5}} justifyContent='center' alignItems='center'>
          <Videos videos={suggested} direction={{md: 'column', xs:'row'}}/>
        </Box>

      </Stack>
    </Box>
  )
}

export default VideoDetail