import React from 'react';
import { Box, Container, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.png";

const headingOptions = {
    pos: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    textTransform: "uppercase",
    p: "4",
    size: "4xl",
}


const Home = () => {
    return (
        <Box>
            <MyCarousel />
            <Container
                minH={'100vh'}
                maxW={'container.xl'}
                p={'16'}>
                <Heading
                    textTransform={'uppercase'}
                    py='2'
                    w={'fit-content'}
                    borderBottom={'2px solid'}
                    m='auto'>Services</Heading>
                <Stack
                    h={'full'}
                    alignItems={'center'}
                    direction={['column', 'row']}>
                    <Image
                        src={img5}
                        h={["40", '300']}
                        filter={'hue-rotate(-130deg)'} />
                    <Text
                        letterSpacing={'widset'}
                        lineHeight={"190%"}
                        
                        textAlign={"center"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa illo aliquam obcaecati, sapiente in esse libero vel quidem assumenda culpa fugiat magni, dolor iusto sed? Dolor consequatur, recusandae aperiam qui corrupti eos esse praesentium consequuntur quod quidem ratione nemo tenetur nostrum ducimus vel quas a? Mollitia, magni possimus. Ipsam esse, illo laborum minima culpa deleniti reprehenderit quo officia ex? Veritatis, doloribus aperiam hic nesciunt ipsa illum, nobis dolor laborum ea aut fuga accusamus velit esse repudiandae, nulla exercitationem natus optio commodi omnis? Dolores rem accusantium non nisi voluptate incidunt veritatis fuga nesciunt ipsum, quia maiores, accusamus minus ducimus maxime aliquam!</Text>
                </Stack>
            </Container>
        </Box>
    )
};
const MyCarousel = () => (
    <Carousel autoPlay infiniteLoop interval={1000} showStatus={false} showThumbs={false} showArrows={false}>
        <Box w='full' h={'80vh'}>
            <Image src={img1} height={'full'} w={'full'} objectFit={'cover'} />
            <Heading bgColor={'blackAlpha.600'} color={'white'} {...headingOptions}>Future of Ai</Heading>
        </Box>
        <Box w='full' h={'80vh'}>
            <Image src={img2} height={'full'} w={'full'} objectFit={'cover'} />
            <Heading bgColor={'whiteAlpha.900'} color={'black'} {...headingOptions}>Future is Gaming</Heading>
        </Box>
        <Box w='full' h={'80vh'}>
            <Image src={img3} height={'full'} w={'full'} objectFit={'cover'} />
            <Heading bgColor={'whiteAlpha.600'} color={'black'} {...headingOptions}>Gaming on Console</Heading>
        </Box>
        <Box w='full' h={'80vh'}>
            <Image src={img4} height={'full'} w={'full'} objectFit={'cover'} />
            <Heading bgColor={'whiteAlpha.600'} color={'black'} {...headingOptions}>Night Life is Cool</Heading>
        </Box>
    </Carousel>
);

export default Home