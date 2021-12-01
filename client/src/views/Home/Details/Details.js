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
                    <td>{meal[1][0]}</td>
                    <td>{meal[2][0]}</td>
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
        let target = document.getElementsByClassName('editMenuButton')[0].children[0].classList;
        if (target.contains('bi-pen'))
        {
            document.getElementsByTagName('tbody')[0].contentEditable = 'true';
            target.remove('bi-pen');
            target.add('bi-check-lg');
        }else{
            document.getElementsByTagName('tbody')[0].contentEditable = 'false';
            target.remove('bi-check-lg');
            target.add('bi-pen');
            updateMeals()
        }
    }

    function updateMeals(){
        let rows = document.querySelectorAll('tbody tr'); 

        let updatedMeals = [];
        let changedMeals = [];
        rows.forEach((row,index) => {
            let meals = Array.from(row.children);
            meals.forEach((meal,i) => {
                if (i!=0)
                    updatedMeals.push([meal.innerText,index,i]); 
            });
        });

        details.forEach((mealsOfDay,day) => {
            mealsOfDay.forEach((mealDetails,time) => {
                if(updatedMeals[day*3 + time][0] != mealDetails[0])
                    changedMeals.push([updatedMeals[day*3 + time][0],day,mealDetails[2]]);
            })
        })

        // console.log(changedMeals);
        postUpdatedMeals(changedMeals);
    }

    async function postUpdatedMeals(changedMeals){
        
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messID: user['messid'],
                updatedMeals: changedMeals
            })
        }

        const response = await fetch('http://localhost:5000/update-meals', requestOptions)
        // fetch('http://localhost:5000/update-meals', requestOptions);
        // const data = await response.json()
    }

    const user = useSelector((state)=> state.user.value)

    const [details, setDetails] = useState([])
    const [managerName, setManagerName] = useState()
    const [managerContact, setManagerContact] = useState()
    const [numberOfStudents, setNumberOfStudents] = useState()
    const [lastFeesCalculated, setLastFeesCalculated] = useState()

    async function fetchMessDetails()
    {
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messid: user['messid'] })
        }

        const response = await fetch('http://localhost:5000/messdetails', requestOptions)
        let data = await response.json()

        setManagerName(data['details'][0][1])
        setManagerContact(data['details'][0][2])
        setLastFeesCalculated(data['details'][0][3].slice(0,-12))
        setNumberOfStudents(data['count'])

        console.log(data['count'],data['details'])

        data = data['meals']
        let detailsOrganised = []
        for(var i=0; i<7; i++)
            detailsOrganised.push([])
        // console.log(data)
        data.forEach(meal => 
        {
            // console.log(meal)
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
                    <div class="col-auto text-center">
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
                        {/* {isAdmin()} */}
                    </table>
                </div>

                <div className="row info-wrapper justify-content-center text-center align-items-center">

                    <div className="info-card-wrapper col">
                        <div className="info-card d-flex flex-column justify-content-center text-start">
                                <p className='text-muted'>Manager Details</p>
                                <p><strong>{managerName}</strong></p>
                                <p><strong>{managerContact}</strong></p>
                        </div>
                    </div>

                    <div className="info-card-wrapper col">
                        <div className="info-card">
                            <p className='text-muted'>Number of Students</p>
                            <p><strong>{numberOfStudents}</strong></p>
                        </div>
                    </div>

                    <div className="info-card-wrapper col">
                        <div className="info-card">
                            <p className='text-muted'>Fees last calculated at: </p>
                            <p><strong>{lastFeesCalculated}</strong></p>
                        </div>
                    </div>

                </div>
                
            </div>}
            
            {/* <div className='button-row row justify-content-end'>
                
            </div> */}
            <footer style={{marginTop:'7rem'}}></footer>
        </div>
    )
}

export default Details
