import React from 'react'
import { useSelector } from 'react-redux'
import './Dashboard.css'

const Dashboard = () => 
{
    const user = useSelector((state)=> state.user.value)

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
        </div>
    )
}

export default Dashboard
