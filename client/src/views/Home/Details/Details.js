import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import './Details.css'

const Details = () => 
{

    const dayName = 
    {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday'
    }

    function displayMeal(meal)
    {
        if(meal.length)
            return( 
                <div className="mealDetails">
                    <span className="mealName">{meal[0]}</span>
                    <span className="mealTime">{meal[2]}</span>
                </div>
                )
        return ''
    }

    function dayMeals(day)
    {
        if(day.length)
        return <div className="dayWrapper">
            <span className="dayName">{dayName[day[0][1]]}</span>
            <div className="mealsWrapper">
                {day.map((meal)=> displayMeal(meal))}
            </div>
        </div>
        return ''
    }

    const user = useSelector((state)=> state.user.value)

    const [details, setDetails] = useState([])

    async function fetchMessDetails()
    {
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messid: user['messid'] })
        }

        const response = await fetch('http://localhost:5000/messdetails', requestOptions)
        const data = await response.json()

        
        let detailsOrganised = []
        for(var i=0; i<7; i++)
            detailsOrganised.push([])

        data.forEach(meal => 
        {
            detailsOrganised[meal[1]].push(meal)
        });

        setDetails(detailsOrganised)

        console.log('Organised data: ')
        console.log(detailsOrganised)
    }

    useEffect(() => 
    {
       fetchMessDetails()
    },[]);
        

    return (
        <div className="detailsWrapper">
            {user['messname']===''?'You are not registered to any mess currently.':
            <div className="messName">
                You are registered to mess {user['messname']} 
            </div>}
            {details.length==0?'':
             details.map((day)=> dayMeals(day))
            }
        </div>
    )
}

export default Details
