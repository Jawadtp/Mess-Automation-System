import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './Dashboard.css'
import RegMenu from './MessRegistration/RegMenu'

const Dashboard = () => 
{
    const user = useSelector((state)=> state.user.value)
    const [announcements, setAnnouncements] = useState([])
    const [isMessRegModalShown, showMessRegModal] = useState(false)
    const [regReq, setRegReq] = useState('loading')

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
        
        if ( data.length === 0 )
            data.push(['','','No announcements to show'])

        setAnnouncements(data)
    }

    async function getRegRequest()
    {
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollno: user['rollno'] })
        }

        const response = await fetch('http://localhost:5000/regreq', requestOptions)

        console.log('reg request: ', response)
        const data = await response.json()
        console.log('ref req data: ',data)
        setRegReq(data)
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
                                {announcement[3].slice(0,-17)}
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

    

    function displayCurrentMess()
    {
        if(user['messname']==='' && user['role']==='student')
            return <div className='registerMess'>
                {regReq==='loading'?'Loading':regReq=='no request'?
                <button type="button" class="btn btn-primary" onClick={()=>{showMessRegModal(true)}}>Register in a mess</button>:
                'Registration request to be processed for mess '+regReq
                }
            </div>

        else if(user['messname']==='' && user['role']==='manager')
            return <div className='managerNotRegistered'>You are not currently managing any mess.</div>
        
        return <div className='currentMess'>
            You are {user['role']==='student'?'registered to ':'managing '} mess {user['messname']}
        </div>
    }

    useEffect(() => 
    {
       fetchAnnouncements()
       getRegRequest()
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
                        {displayCurrentMess()}
                        
                    </div>
                </div>

                <div className='col-10 col-md-4 col-xl-3'>
                    <div className='current-fees'>
                        <div>Current Fees</div>
                        <h2><strong>Rs. 3,266</strong></h2>
                        <h6 className='text-muted'>Extras: {}</h6>
                    </div>
                </div>

                <div className='col-10 col-md-8 col-xl-3 text-center justify-content-center d-flex flex-column'>
                    <div>
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
        

            {isMessRegModalShown?<RegMenu showMessRegModal={showMessRegModal} getRegRequest={getRegRequest}/>:''}
            
            <div className='footer'></div>
        </div>
    )
}

export default Dashboard
