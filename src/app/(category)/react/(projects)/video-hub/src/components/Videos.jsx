import { Heading, Stack, VStack, Text, Button } from '@chakra-ui/react'
import React, { useState } from 'react'

const Videos = () => {
    const videosArr = [
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      ];

    const[videoSrc, setVideoSrc] = useState(videosArr[0]);
    
  return (
    <Stack direction={["column", 'row']} h={'100vh'}>
        <VStack w={'full'}>
            <video controls
            controlsList='nodownloads'
            src={videoSrc}
            style={{
                width:"100%",
            }}
            ></video>
            <VStack alignItems={'flex-start'} p={'8'} w={"full"} overflowY={'auto'}>
                <Heading>Sample Video 1</Heading>
                <Text>This is a sample video for testing and demo. this is called description</Text>
            </VStack>

        </VStack>

        <VStack w={['full','xl']} alignItems={'stretch'} p={'8'} spacing={'8'} overflowY={'auto'}>
             {videosArr.map((item,index)=>(
                <Button variant={'ghost'} colorScheme='purple' onClick={()=>setVideoSrc(item)}>
                Lecture {index+1}
             </Button>
             ))}

        </VStack>
    </Stack>
  )
}

export default Videos