import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Dashboard from './Dashboard/Dashboard'
import Details from './Details/Details'
import Header from './header/header'
import Sidebar from './Sidebar/Sidebar'
import Manage from './Manage/manage'
import './Home.css'

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
            case 'manage':
                return <Manage/>
            default: 
                return view + ' to be implemented'
        }
    }

    return (

        <div className="homeWrapper">
            <Sidebar view={view} setView={setView}/>
            <div className="homeContent">
                <Header/>
                <div className='path'>
                    <h4 className='text-muted p-4'>Home/<strong>{view}</strong></h4>
                </div>
                {renderView(view)}
            </div>
        </div>
    )
}

export default Home
