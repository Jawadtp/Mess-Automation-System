import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
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
                {announcement[0]}
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
            <div className="userInfo">
                <div className="rollno">
                    {user['name']}
                </div>
                <div className="rollno">
                    {user['rollno']}
                </div>
                <div className="rollno">
                    {user['email']}
                </div>
                <div className="rollno">
                    {user['messname']===''?'Not registered to any mess':'Registered mess: ' + user['messname']}

                </div>
            </div>
            
            <div className="annWrapper">
                <div className="annTitle">
                    Announcements
                </div>
                {announcements.map((announcement) => displayAnnouncement(announcement))}
            </div>
        </div>
    )
}

export default Dashboard
