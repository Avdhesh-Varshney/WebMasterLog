import React from 'react'
import { Drawer,DrawerBody,DrawerOverlay,DrawerHeader,DrawerContent,DrawerCloseButton,Button, useDisclosure, VStack, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {BiMenuAltLeft} from 'react-icons/bi';


const Header = () => {
    const btnRef = React.useRef()
    const {isOpen,onOpen,onClose}= useDisclosure();
  return (
    <>
    <Button pos={'fixed'} top={'4'} left={'4'} colorScheme='purple' p={'0'} w={'10'} h={'10'} borderRadius={'full'} onClick={onOpen} zIndex={'overlay'}>
        <BiMenuAltLeft size={'20'}/>
    </Button>
    <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef} >
    <DrawerOverlay/>
        <DrawerContent>
        <DrawerCloseButton/>
        <DrawerHeader>Main Hub</DrawerHeader>
        <DrawerBody>
            <VStack alignItems={'flex-start'}>
            <Button onClick={onClose} colorScheme={'purple'} variant={'ghost'}>
                <Link to={'/'}>Home</Link>
            </Button>
            <Button onClick={onClose} colorScheme={'purple'} variant={'ghost'}>
                <Link to={'/videos'}>Videos</Link>
            </Button>
            <Button onClick={onClose} colorScheme={'purple'} variant={'ghost'}>
                <Link to={'/videos?category=free'}>Free Videos</Link>
            </Button>
            <Button onClick={onClose} colorScheme={'purple'} variant={'ghost'}>
                <Link to={'/upload'}>Upload Video</Link>
            </Button>
            </VStack>

            <HStack pos={'absolute'} bottom={'10'} left={'0'}  w={'full'} justifyContent={"space-evenly"}>
                <Button onClick={onClose} colorScheme={'purple'}>
                    <Link  to={'/login'}>Log In</Link>
                </Button>
                <Button onClick={onClose} colorScheme={'purple'} variant={'outline'}>
                    <Link to={'/signup'}>Sign Up</Link>
                </Button>
            </HStack>

        </DrawerBody>
        </DrawerContent>
    </Drawer>
    </>
  )
}

export default Header