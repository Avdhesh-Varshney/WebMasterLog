import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { generate as randomwords, count } from "random-words";
import UpperMenu from './UpperMenu';
import { useTestMode } from '../context/TestModeContext';
import Stats from './Stats';

function TypingBox() {

    const inputRef = useRef(null);
    const {testSeconds, setTestSeconds} = useTestMode(); 
    const [countDown, setCountDown] = useState(testSeconds);
    const [intervalID, setIntervalID] = useState(null);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);
    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);

    const [wordsArray, setWordsArray] = useState(() => {
        return randomwords(50);
    })

    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [graphData, setGraphData] = useState([]);

    const focusInput = () => {
        inputRef.current.focus();
    }

    const wordsSpanRef = useMemo(() => {
        return Array(wordsArray.length).fill(0).map(i => createRef(null));
    }, [wordsArray]);

    const startTimer = () => {
        setIntervalID(setInterval(timer, 1000));
        function timer(){
            // setCountDown(countDown - 1); This never calls the latest value of countdown
            setCountDown((latestCountDown) => {
                setCorrectChars((correctChars) => {
                    setGraphData((graphData) => {
                        return [...graphData, [
                            testSeconds - latestCountDown + 1,
                            (correctChars / 5) / ((testSeconds - latestCountDown + 1) / 60)
                        ]]
                    })
                    return correctChars
                })
                if(latestCountDown < 1){
                    setTestEnd(true);
                    clearInterval(intervalID);
                    return 0;
                } 
                return latestCountDown - 1;
            });
        }
    }

    const resetTest = () => {
        clearInterval(intervalID);
        setCountDown(testSeconds);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false);
        setTestEnd(false);
        setWordsArray(randomwords(50));
        resetWordSpanRefClassname();
        focusInput();
    }

    const resetWordSpanRefClassname = () => {
        wordsSpanRef.map(i => {
            Array.from(i.current.childNodes).map(j => {
                j.className = '';
            })
        });
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    }

    const handleUserInput = (e) => {
        if(!testStart){
            startTimer();
            setTestStart(true);
        }

        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

        if(e.keyCode === 32){ // Space key

            let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');

            if(correctCharsInWord.length === allCurrChars.length){
                setCorrectWords(correctWords + 1);
            }

            if(allCurrChars.length <= currCharIndex){ // Remove cursor from last character
                allCurrChars[currCharIndex - 1].classList.remove('current-right');
            }
            else{ // Remove cursor from between the word
                allCurrChars[currCharIndex].classList.remove('current');
                setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
            }

            wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current';
            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(0);
            return;
        }

        if(e.keyCode === 8){ // Backspace key
            if(currCharIndex !== 0){
                if(allCurrChars.length === currCharIndex){ // When at the last character of the word
                    if(allCurrChars[currCharIndex - 1].className.includes('extra')){
                        allCurrChars[currCharIndex - 1].remove();
                        allCurrChars[currCharIndex - 2].className += ' current-right';
                    }
                    else{
                        allCurrChars[currCharIndex - 1].className = 'current'
                    }
                    setCurrCharIndex(currCharIndex - 1);
                    return;
                }
                allCurrChars[currCharIndex].className = '';
                allCurrChars[currCharIndex - 1].className = 'current';
                setCurrCharIndex(currCharIndex - 1);
            }
            return;
        }

        if(currCharIndex === allCurrChars.length){
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = 'wrong extra current-right';
            allCurrChars[currCharIndex - 1].classList.remove('current-right');
            wordsSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex + 1);
            setExtraChars(extraChars + 1);
            return;
        }

        if(e.key === allCurrChars[currCharIndex].innerText){
            allCurrChars[currCharIndex].className = 'correct';
            setCorrectChars(correctChars + 1);
        }
        else allCurrChars[currCharIndex].className = 'wrong';
        setIncorrectChars(incorrectChars + 1);

        if(currCharIndex + 1 === allCurrChars.length){
            allCurrChars[currCharIndex].className += ' current-right';
        }
        else allCurrChars[currCharIndex + 1].className = 'current';

        setCurrCharIndex(currCharIndex + 1);
    }

    useEffect(() => {
        focusInput();
        wordsSpanRef[0].current.childNodes[0].className = 'current';
    }, [])

    const calculateWPM = () => {
        return Math.round((correctChars / 5) / (testSeconds / 60));
    }

    const calculateAccuracy = () => {
        return Math.round((correctWords / currWordIndex) * 100);
    }

    useEffect(() => {
        resetTest();
    }, [testSeconds]);

  return (
    <div className='main'>
        <UpperMenu countDown={countDown}/>
        {
            testEnd ? (
                <Stats 
                    wpm={calculateWPM()} 
                    accuracy={calculateAccuracy()} 
                    correctChars={correctChars} 
                    incorrectChars={incorrectChars}
                    extraChars={extraChars} 
                    missedChars={missedChars}
                    graphData={graphData}
                />
            ) : 
            <>
                <div className="type-box" onClick={focusInput}>
                <div className="words">
                    {
                        wordsArray.map((word, index) => (
                            <span className='word' ref={wordsSpanRef[index]} key={index}>
                                {
                                    word.split("").map((letter, index) => (
                                        <span key={index}>{letter}</span>
                                    ))
                                }
                            </span>
                        ))
                    }
                </div>
                </div>
                <input className='hidden-input' ref={inputRef} type="text" onKeyDown={handleUserInput} />
            </>
        }
    </div>
  )
}

export default TypingBox