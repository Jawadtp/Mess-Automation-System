import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
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

    function mealsTable(details) {
        return(details.map( (meal,i) => {
            // console.log(meal)
            if (meal.length)
                return(
                <tr>
                    <td><strong>{dayName[meal[0][1]]}</strong></td>
                    <td>{meal[0][0]}</td>
                    <td>{meal[2][0]}</td>
                    <td>{meal[1][0]}</td>
                </tr>)
        }))
    }

    function isAdmin(){
        if(user['role'] === 'manager'){
            return (<Button onClick={onEditButtonClick} className="editMenuButton p-3">
                        <i className='bi bi-pen'></i>
                    </Button>)
        }else
            return (<div hidden></div>)
    }

    function onEditButtonClick(){
        document.getElementsByTagName('tbody')[0].contentEditable = 'true';
    }
    // function displayMeal(meal)
    // {
    //     if(meal.length)
    //         return( 
    //             <div className="mealDetails">
    //                 <span className="mealName">{meal[0]}</span>
    //                 <span className="mealTime">{meal[2]}</span>
    //             </div>
    //             )
    //     return ''
    // }

    // function dayMeals(day)
    // {
    //     if(day.length)
    //         return (<div className="dayWrapper">
    //             <span className="dayName">{dayName[day[0][1]]}</span>
    //             <div className="mealsWrapper">
    //                 {day.map((meal)=> displayMeal(meal))}
    //             </div>
    //         </div>)
    //     return ''
    // }

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

        // console.log('Organised data: ')
        // console.log(detailsOrganised)
    }

    useEffect(() => 
    {
       fetchMessDetails()
    },[]);
        

    return (
        <div className="detailsWrapper">
            {user['messname']===''?'You are not registered to any mess currently.':
            <div class="menuInfo d-flex flex-column">
                <div className="details-header">
                    <div class="col-auto">
                        <p>Mess {user['messname']}</p>
                    </div> 
                </div>
                <div class="table-wrapper">
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Day</th>
                                <th scope="col">Breakfast</th>
                                <th scope="col">Lunch</th>
                                <th scope="col">Dinner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mealsTable(details)}
                        </tbody>
                    </table>
                </div>
                
            </div>}
            <div className='button-row row justify-content-end'>
                {isAdmin()}
            </div>

        </div>
    )
}

export default Details
