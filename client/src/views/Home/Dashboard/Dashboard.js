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
        // console.log(data)
    }

    function displayAnnouncement(announcements)
    {
        return(
            announcements.map((announcement) => {
                return <tr>
                    <td>
                        <div className="annMessage">
                            <div className="annAuthor">
                                <strong>{announcement[0]}</strong>
                            </div>
                            {/* <div className="annRole">
                                {announcement[1]}
                            </div> */}
                            <div className="annTime text-muted">
                                {announcement[3]}
                            </div>
                            <div className="annContent">
                                {announcement[2]}
                            </div>
                        </div>
                    </td>
                </tr>
            })
        ) 
    }

    useEffect(() => 
    {
       fetchAnnouncements()
    },[]);

    return (
        <div className="dashboardWrapper">
            
            <div className='row info justify-content-center'>
                <div className="col-10 col-md-4 col-xl-3 text-start">
                    <div className='user-info'>
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
                </div>

                <div className='col-10 col-md-4 col-xl-3'>
                    <div className='current-fees'>
                        <div>Current Fees</div>
                        <h2><strong>Rs. 3,266</strong></h2>
                        <h6 className='text-muted'>Extras: {}</h6>
                    </div>
                </div>

                <div className='col-10 col-md-8 col-xl-3 text-center justify-content-center secondary-info d-flex flex-column'>
                    <div className='test'>
                        <div id='pending-fee'>
                            <div>Pending Fees</div>
                            <h3><strong>Rs. 4,523</strong></h3>
                        </div>
                        <div className='fees-status'>
                            <div>Status:</div>
                            <div> Cleared</div>
                        </div>
                    </div>

                    <div className='test'>
                        <div id='next-meal'>
                            <div>Next Meal</div>
                            <h3><strong>Sample Meal Here</strong></h3>
                        </div>
                    </div>
                </div>

                <div className='col-10 col-md-8'>
                    <div class="annWrapper">
                        <div className='announcement-table'>
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th><h3><strong>Announcements</strong></h3></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayAnnouncement(announcements)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            

            <div className='footer'></div>
        </div>
    )
}

export default Dashboard
