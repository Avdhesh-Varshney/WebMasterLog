import React,{useState,useEffect} from 'react'
import styled from 'styled-components'

// specifying our image path.
const imagePath = process.env.PUBLIC_URL + '/images/';

// creating styled components
const IndicatorWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: white;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  margin: 5px;
  transition: 750ms all ease-in-out;
  cursor: pointer;
`;
// sub component.
const Indicator = ({ currentSlide, amountSlides, nextSlide }) => {
    return (
      <IndicatorWrapper>
        {Array(amountSlides)
          .fill(1)
          .map((_, i) => (
            <Dot
              key={i}
              isActive={currentSlide === i}
              onClick={() => nextSlide(i)}
            />
          ))}
      </IndicatorWrapper>
    );
  };

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
  position: relative;
`;

const Slide = styled.div`
  height: 100%;
  width: 100vw;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
  transition: 750ms all ease-in-out;
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Gradient = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;


function ImageSlider(
    {
        images = [],
        autoPlay = true,
        autoPlayTime = 3000,
        children,
        ...props
    }
) {
  // following state variable indicates the default slide.
    const [currentSlide, setCurrentSlide] = useState(0);
    // following method will go to the next slide
    function nextSlide(slideIndex = currentSlide + 1) {

        const newSlideIndex = slideIndex >= images.length ? 0 : slideIndex;
        setCurrentSlide(newSlideIndex);
    }
    // changing slide using useEffect hook
    useEffect(() => {
        const timer = setTimeout(() => {
          nextSlide();
        }, autoPlayTime);
        // The clearTimeout() method clears a timer set with the setTimeout() method.
        return () => clearTimeout(timer);
      }, [currentSlide]);

    return (
        <Wrapper {...props}>
        {images.map((image, index) => (
            <Slide
            key={index}
            style={{
                backgroundImage: `url(${imagePath}${image})`,
                marginLeft: index === 0 ? `-${currentSlide * 100}%` : undefined,
            }}
            ></Slide>
        ))}
        <Gradient />
        <Indicator
            currentSlide={currentSlide}
            amountSlides={images.length}
            nextSlide={nextSlide}
        />
        <ChildrenWrapper>{children}</ChildrenWrapper>
        </Wrapper>
    )
}

export default ImageSlider
