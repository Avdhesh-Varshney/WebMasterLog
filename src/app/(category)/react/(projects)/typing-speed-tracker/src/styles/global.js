import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle `

body{
    background: ${({theme}) => theme.background};
    color: ${({theme}) => theme.title};
    transition: all ease 0.3s;
    overflow-x: hidden;
}

.header{
    width: 80vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -10vh;
}

.header img{
    width: 250px;
}

.hoverable:hover{
    cursor: pointer;
}

.canvas{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    gap:0.5rem;
    padding: 2rem;
    width: 100vw;
    align-items: center;
}

.main{
    ${'' /* padding-top: 15vh; */}
    padding-bottom: 12vh;
}

.type-box{
    display: block;
    max-width: 70vw;
    height: 20vh;
    padding-top: 2vh;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

.words{
    font-size: 32px;
    display: flex;
    flex-wrap: wrap;
    color: ${({theme}) => theme.typeBoxText};
}

.word{
    margin: 5px;
    padding-right: 3px;
}

.upper-menu{
    display: flex;
    width: 70vw;
    justify-content: center;
    fontsize: 1.4rem;
    color: grey;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 2vh;
}

.counter{
    padding: 0.5vw 1vw;
    font-size: 1.5rem;
    color: yellow
}

.modes{
    display: flex;
}

.time-mode{
    border: 1px solid ${({theme}) => theme.typeBoxText};
    color: ${({theme}) => theme.typeBoxText};
    padding: 0.5vw 1vw;
    transition: color, background-color ease 0.3s;
    cursor: pointer;
}

.time-mode:hover{
    background-color: ${({theme}) => theme.typeBoxText};;
    color: ${({theme}) => theme.title};
}

.hidden-input{
    opacity: 0;
}

@keyframes blinkleft{
    0%{
        border-left-color: ${({theme}) => theme.background};
    }
    50%{
        border-left-color: ${({theme}) => theme.typeBoxText};
    }
    100%{
        border-left-color: ${({theme}) => theme.background};
    }
}

.current{
    border-left: 1px solid grey;
    animation: blinkleft 1s infinite linear;
}

@keyframes blinkright{
    0%{
        border-right-color: ${({theme}) => theme.background};
    }
    50%{
        border-right-color: ${({theme}) => theme.typeBoxText};
    }
    100%{
        border-right-color: ${({theme}) => theme.background};
    }
}

.current-right{
    border-right: 1px solid grey;
    animation: blinkright 1s infinite linear;
}

.correct{
    color: lightgreen;
}

.wrong{
    color: crimson;
}

.footer{
    width: 70%;
    display: flex;
    justify-content: space-between;
}

.footer a{
    color: inherit;
}

${'' /* stats */}
.stats-box{
    display: flex;
    width: 100%;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}

.left-stats{
    width: 30%;
    padding: 30px;
}

.right-stats{
    width: 70%;
}

.title{
    font-size: 20px;
    color: ${({theme}) => theme.typeBoxText};
}

.subtitle{
    font-size: 30px;
    color: ${({theme}) => theme.title}
}

.user-profile{
    width: 30vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    height: 12rem;
    background: ${({theme}) => theme.typeBoxText};
    border-radius: 25px;
    justify-content: center;
    align-items: center;
    margin-top: -10vh;
    margin-bottom: 10vh;
}

`