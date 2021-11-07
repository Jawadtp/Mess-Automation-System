import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Dashboard from './Dashboard/Dashboard'
import Details from './Details/Details'
import './Home.css'
import Sidebar from './Sidebar/Sidebar'

const Home = () => 
{
    const [view, setView] = useState('dashboard')

    function renderView(view)
    {
        switch(view)
        {
            case 'dashboard':
                return <Dashboard/>
            case 'details':
                return <Details/>
            default: 
                return view + ' to be implemented'
        }
    }

    return (

        <div className="homeWrapper">
            <Sidebar view={view} setView={setView}/>
            <div className="homeContent">
                {renderView(view)}
            </div>
        </div>
    )
}

export default Home
