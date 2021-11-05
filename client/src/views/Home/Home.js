import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => 
{

    const user = useSelector((state)=> state.user.value)
    return (
        <div>
            Hi {user['name']}
            
        </div>
    )
}

export default Home
