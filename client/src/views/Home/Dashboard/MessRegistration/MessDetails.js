import React, {useState, useEffect} from 'react'
import { dayName} from '../../../../constants/constants'
import './MessReg.css'

const MessDetails = (props) => 
{
    const [messMeals, setMessMeals] = useState([])
    const [messDetails, setMessDetails] = useState({})

    async function fetchMessDetails()
    {
       console.log('Mess id is :',props.messid)
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messid: props.messid })
        }

        const response = await fetch('http://localhost:5000/messdetails', requestOptions)
        let data = await response.json()
        console.log('data received: ',data)
        setMessDetails({...messDetails, count: data['count'], manager: data['details'][0][1], messname: data['details'][0][0]})

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

        setMessMeals(detailsOrganised)
        // console.log('Organised data: ')
        // console.log(detailsOrganised)
    }

    function mealsTable() 
    {
       

        return(messMeals.map( (meal,i) => {
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
   
    useEffect(() => 
    {
       fetchMessDetails()
    },[props.messid]);

    return (
        <div className="messDetails">
            {!Object.keys(messDetails).length?'':
                <div className="messInfo">
                    <div className="studentCount">
                        Total number of registered students: {messDetails['count']}
                    </div>
                    <div className="managerName">
                        Manager name: {messDetails['manager']}
                    </div>
                </div>
            }
                <div className="table-wrapper messreg">
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
                            {messMeals.length?mealsTable():''}
                        </tbody>

                    </table>
                </div>
            </div>
    )
}

export default MessDetails
