import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './Dashboard.css'

const Dashboard = () => 
{
    const user = useSelector((state)=> state.user.value)

    const [announcements, setAnnouncements] = useState([])

    async function fetchAnnouncements()
    {
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messid: user['messid'] })
        }

        const response = await fetch('http://localhost:5000/announcements', requestOptions)
        const data = await response.json()
        setAnnouncements(data)
        console.log(data)
    }

    function displayAnnouncement(announcement)
    {
        return <div className="annMessage">
            <div className="annAuthor">
                <strong>{announcement[0]}</strong>
            </div>
            <div className="annRole">
                {announcement[1]}
            </div>
            <div className="annTime">
                {announcement[3]}
            </div>
            <div className="annContent">
                {announcement[2]}
            </div>
        </div>
    }

    useEffect(() => 
    {
       fetchAnnouncements()
    },[]);

    return (
        <div className="dashboardWrapper">
            
            <div className='row info justify-content-center'>
                <div className="col-10 col-md-5 col-xl-3 userInfo text-start">
                    <div className="name">
                        {user['name']}
                    </div>
                    <div className="rollno">
                        {user['rollno']}
                    </div>
                    <div className="email" title={`${user['email']}`}>
                        {user['email']}
                    </div>
                   
                </div>

                <div className='col-10 col-md-5 col-xl-3 dummyInfo'>
                    DUMMY
                </div>

                <div className='col-10 col-md-4 text-center justify-content-center secondDummyInfo d-flex flex-column'>
                    <div className='test'>
                        TEST
                    </div>
                    <div className='test'>
                        TEST
                    </div>
                </div>

                <div className='col-10 col-md-8 annWrapper'>
                    <div className="annTitle">
                        Announcements
                    </div>
                    {announcements.map((announcement) => displayAnnouncement(announcement))}

                </div>
            </div>
            

            <div className='footer'></div>
        </div>
    )
}

export default Dashboard
