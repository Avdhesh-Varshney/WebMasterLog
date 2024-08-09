import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Card, CardContent, CardMedia } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../utils/constants'

const VideoCard = ({video: {id : { videoId}, snippet}}) => {

  console.log(snippet)
  
  return (
    <Card sx={{width: {xs: '94vw', sm: '340px', md: '300px'}, boxShadow: 'none', borderRadius: '12px', border: 'none', pb: 1, bgcolor: '#000'}}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia 
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title || demoThumbnailUrl}
          sx={{width: {xs: '94vw', sm: '340px', md: '300px'}, height: {xs: '200px', sm:'180px'}, borderRadius: '12px'}}
        />
      </Link>

      <CardContent sx={{backgroundColor: '#000', height: 'auto' }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography variant='subtitle1' fontWeight={"bold"} color={'#fff'}>
            {snippet?.title.slice(0,35) || demoVideoTitle.slice(0,35)}
          </Typography>
        </Link>

        <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
          <Typography variant='subtitle2' fontWeight={"bold"} color={'gray'}>
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{fontSize: 12, color:'gray', ml:'10px'}} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  )
}

export default VideoCard