import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Dashboard from './Dashboard/Dashboard'
import './Home.css'
import Sidebar from './Sidebar/Sidebar'

const Home = () => 
{
    const [view, setView] = useState('dashboard')


    return (

        <div className="homeWrapper">
            <Sidebar setView={setView}/>
            <div className="homeContent">

                {view==='dashboard'?<Dashboard/>:<span>{view}</span>}
            </div>
        </div>
    )
}

export default Home
