import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TableComponent from '../components/TableComponent';
import Graph from '../components/Graph';
import UserInfo from '../components/UserInfo';
import Header from '../components/Header';

function UserPage() {
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        const resultRef = db.collection('Results');
        const {uid} = auth.currentUser;
        let tempData = [];
        let tempGraphData = [];
        resultRef.where('userID', '==', uid)
        .orderBy('timeStamp', 'desc')
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                tempData.push({...doc.data()});
                tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0], doc.data().wpm]);
            });
            setData(tempData);
            setGraphData(tempGraphData);
            setDataLoading(false);
        });
    }

    useEffect(() => {
        if(!loading){
            fetchUserData();
        }
        if(!loading && !user){
            navigate("/");
        }
    }, [loading]);

    if(loading || dataLoading){
        return <CircularProgress style={{position: 'absolute', left: '50%', top: '50%'}}/>
    }

  return (
    <div className="canvas">
        <Header />
        <UserInfo totalTestsTaken={data.length}/>
        <span className='graph-userpage' style={{ width: '100%', height: '500px', marginLeft: '25vw'}}>
            <Graph graphData={graphData} />
        </span>
        <TableComponent data={data}/>
    </div>
  )
}

export default UserPage