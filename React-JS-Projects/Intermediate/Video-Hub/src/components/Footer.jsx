import { Box, Button, HStack, Heading, Input, Stack, VStack,Text } from '@chakra-ui/react'
import React from 'react';
import {AiOutlineSend} from "react-icons/ai"

const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'} minH={'40'} p="16" color={'white'}>
        <Stack direction={['column', 'row']}>
            <VStack alignItems={'stretch'} w={'full'} px={'4'}>
                <Heading size={"md"} textTransform={'uppercase'} textAlign={['center','left']}>
                    Subscribe to get updates
                </Heading>
                <HStack 
                borderBottom={'2px solid white'}
                >
                    <Input placeholder='Enter Email Here...' border={"none"} borderRadius={"none"} outline={"none"} focusBorderColor="none"/>
                    <Button
                    p={'0'}
                    colorScheme='purple'
                    variant={'ghost'}
                    borderRadius={'0 20px 20px 0'}
                    
                    >
                        <AiOutlineSend size={20}/>
                    </Button>
                </HStack>
            </VStack>

            <VStack w={'full'}
            borderLeft={['none', '1px solid white']}
            borderRight={['none', '1px solid white']}
            >
                <Heading textTransform={'uppercase'} textAlign={'center'}>
                    VIDEO HUB
                </Heading>
                <Text>All rights reserved</Text>
            </VStack>

            <VStack w={'full'}
            
            >
                <Heading size={'md'} textTransform={'uppercase'}>
                    Social Media
                </Heading>
                <Button variant={'link'} colorScheme={'whiteAlpha'}>
                    <a target="blank" href="https://github.com/roushan-code">GitHub</a>
                </Button>
                <Button variant={'link'} colorScheme={'whiteAlpha'}>
                    <a target="blank" href="https://instagram.com/roushansingh3698?igshid=MzMyNGUyNmU2YQ==">Instagram</a>
                </Button>
                <Button variant={'link'} colorScheme={'whiteAlpha'}>
                    <a target="blank" href="https://www.facebook.com/profile.php?id=100032073308149&mibextid=ZbWKwL">Facebook</a>
                </Button>
            </VStack>
        </Stack>

    </Box>
  )
}

export default Footer