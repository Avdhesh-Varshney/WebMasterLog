import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    background-color:var(--primary-bg);
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  h1 {
    position: relative;
    margin: 0 auto;
    top: 25vh;
    width: 100vw;
    text-align: center;
    font-family: var(--font);
    font-size: 6vh;
    color: #333;
    opacity: 0.75;
    animation: pulse 2.5s linear infinite;
  }

  #cooking {
    position: relative;
    margin: 0 auto;
    top: 0;
    width: 75vh;
    height: 75vh;
    overflow: hidden;
  }
  #cooking .bubble {
    position: absolute;
    border-radius: 100%;
    box-shadow: 0 0 0.25vh #4d4d4d;
    opacity: 0;
  }
  #cooking .bubble:nth-child(1) {
    margin-top: 2.5vh;
    left: 58%;
    width: 2.5vh;
    height: 2.5vh;
    background-color: #454545;
    animation: bubble 2s cubic-bezier(0.53, 0.16, 0.39, 0.96) infinite;
  }
  #cooking .bubble:nth-child(2) {
    margin-top: 3vh;
    left: 52%;
    width: 2vh;
    height: 2vh;
    background-color: #3d3d3d;
    animation: bubble 2s ease-in-out 0.35s infinite;
  }
  #cooking .bubble:nth-child(3) {
    margin-top: 1.8vh;
    left: 50%;
    width: 1.5vh;
    height: 1.5vh;
    background-color: #333;
    animation: bubble 1.5s cubic-bezier(0.53, 0.16, 0.39, 0.96) 0.55s infinite;
  }
  #cooking .bubble:nth-child(4) {
    margin-top: 2.7vh;
    left: 56%;
    width: 1.2vh;
    height: 1.2vh;
    background-color: #2b2b2b;
    animation: bubble 1.8s cubic-bezier(0.53, 0.16, 0.39, 0.96) 0.9s infinite;
  }
  #cooking .bubble:nth-child(5) {
    margin-top: 2.7vh;
    left: 63%;
    width: 1.1vh;
    height: 1.1vh;
    background-color: #242424;
    animation: bubble 1.6s ease-in-out 1s infinite;
  }
  #cooking #area {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50%;
    background-color: transparent;
    transform-origin: 15% 60%;
    animation: flip 2.1s ease-in-out infinite;
  }
  #cooking #area #sides {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: 15% 60%;
    animation: switchSide 2.1s ease-in-out infinite;
  }
  #cooking #area #sides #handle {
    position: absolute;
    bottom: 18%;
    right: 80%;
    width: 35%;
    height: 20%;
    background-color: transparent;
    border-top: 1vh solid #333;
    border-left: 1vh solid transparent;
    border-radius: 100%;
    transform: rotate(20deg) rotateX(0deg) scale(1.3, 0.9);
  }
  #cooking #area #sides #pan {
    position: absolute;
    bottom: 20%;
    right: 30%;
    width: 50%;
    height: 8%;
    background-color: #333;
    border-radius: 0 0 1.4em 1.4em;
    transform-origin: -15% 0;
  }
  #cooking #area #pancake {
    position: absolute;
    top: 24%;
    width: 100%;
    height: 100%;
    transform: rotateX(85deg);
    animation: jump 2.1s ease-in-out infinite;
  }
  #cooking #area #pancake #pastry {
    position: absolute;
    bottom: 26%;
    right: 37%;
    width: 40%;
    height: 45%;
    background-color: #333;
    box-shadow: 0 0 3px 0 #333;
    border-radius: 100%;
    transform-origin: -20% 0;
    animation: fly 2.1s ease-in-out infinite;
  }

  @keyframes jump {
    0% {
      top: 24%;
      transform: rotateX(85deg);
    }
    25% {
      top: 10%;
      transform: rotateX(0deg);
    }
    50% {
      top: 30%;
      transform: rotateX(85deg);
    }
    75% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(85deg);
    }
  }
  @keyframes flip {
    0% {
      transform: rotate(0deg);
    }
    5% {
      transform: rotate(-27deg);
    }
    30%, 50% {
      transform: rotate(0deg);
    }
    55% {
      transform: rotate(27deg);
    }
    83.3% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  @keyframes switchSide {
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotateY(0deg);
    }
  }
  @keyframes fly {
    0% {
      bottom: 26%;
      transform: rotate(0deg);
    }
    10% {
      bottom: 40%;
    }
    50% {
      bottom: 26%;
      transform: rotate(-190deg);
    }
    80% {
      bottom: 40%;
    }
    100% {
      bottom: 26%;
      transform: rotate(0deg);
    }
  }
  @keyframes bubble {
    0% {
      transform: scale(0.15, 0.15);
      top: 80%;
      opacity: 0;
    }
    50% {
      transform: scale(1.1, 1.1);
      opacity: 1;
    }
    100% {
      transform: scale(0.33, 0.33);
      top: 60%;
      opacity: 0;
    }
  }
  @keyframes pulse {
    0% {
      transform: scale(1, 1);
      opacity: 0.25;
    }
    50% {
      transform: scale(1.2, 1);
      opacity: 1;
    }
    100% {
      transform: scale(1, 1);
      opacity: 0.25;
    }
  }
`