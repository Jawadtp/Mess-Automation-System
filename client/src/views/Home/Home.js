import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Dashboard from './Dashboard/Dashboard'
import Details from './Details/Details'
import Header from './header/header'
import Sidebar from './Sidebar/Sidebar'
import Manage from './Manager/managerManage'
import StudentManage from './Student/studentManage'
import './Home.css'

const Home = () => 
{
    const [view, setView] = useState('dashboard')
    const user = useSelector((state)=> state.user.value)
    // console.log('User: ',user)
    function renderView(view)
    {
        switch(view)
        {
            case 'dashboard':
                return <Dashboard/>
            case 'details':
                return <Details/>
            case 'manage':
                if ( user['role'] === 'manager' )                
                    return <Manage/>
                else
                    return <StudentManage/>
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

            {/* <div className="footer"></div> */}
        </div>
    )
}

export default Home
