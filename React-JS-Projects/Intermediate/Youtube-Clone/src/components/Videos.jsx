import React from 'react'
import { Stack, Box } from '@mui/material'
import {VideoCard} from './'
import {ChannelCard} from './'

const Videos = ({videos, direction}) => {
  return (
    <Stack direction={direction || 'row'} sx={{width: '100%'}} flexWrap={'wrap'} gap={2} justifyContent={'center'}>
      {videos.map((item, index)=>(
        <Box key={index}>
          {item.id.videoId && <VideoCard video={item}/> }
          {item.id.channelId && <ChannelCard channelDetail={item} marginTop='0px'/> }
        </Box>
      ))}
    </Stack>
  )
}

export default Videos