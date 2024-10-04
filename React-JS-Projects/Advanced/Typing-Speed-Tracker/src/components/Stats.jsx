import React, { useEffect } from 'react'
import Graph from './Graph'
import { auth, db } from '../firebaseConfig';
import { Bounce, toast } from 'react-toastify';

function Stats({wpm, accuracy, correctChars, incorrectChars, missedChars, extraChars, graphData}) {

  // Set is used to store only unique values
  let timeSet = new Set();
  const newGraph = graphData.filter(i => {
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  })

  const pushDataToDB = () => {
    if(isNaN(accuracy)){
      toast.error('Invalid Test', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    const resultsRef = db.collection('Results');
    const {uid} = auth.currentUser;
    resultsRef.add({
      wpm: wpm,
      accuracy: accuracy,
      timeStamp: new Date(),
      characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
      userID: uid
    }).then((res) => {
      toast.success('Data saved', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
    }).catch((err) => {
      toast.error('Not able to save the data', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    })
  }

  useEffect(() => {
    if(auth.currentUser){
      pushDataToDB();
    }
    else{
      toast.warning('Login to save the results', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [])

  return (
    <div className='stats-box'>
        <div className="left-stats">
            <div className="title">WPM</div>
            <div className="subtitle">{wpm}</div>
            <div className="title">Accuracy</div>
            <div className="subtitle">{accuracy}</div>
            <div className="title">Characters</div>
            <div className="subtitle" style={{fontSize: '26px'}}>Correct: {correctChars}</div>
            <div className="subtitle" style={{fontSize: '26px'}}>Incorrect: {incorrectChars}</div>
            <div className="subtitle" style={{fontSize: '26px'}}>Missed: {missedChars}</div>
            <div className="subtitle" style={{fontSize: '26px'}}>Extra: {extraChars}</div>
        </div>
        <div className="right-stats">
          <Graph graphData={newGraph}/>
        </div>
    </div>
  )
}

export default Stats