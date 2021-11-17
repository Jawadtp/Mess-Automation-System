import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './complaints.css'

function Complaints(props){

    const user = useSelector((state) => state.user.value);

    const [complaints,setComplaints] = useState([]);

    async function getComplaints(){
        
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messID: user['messid'] })
        }

        let response = await fetch('http://localhost:5000/get-complaints', requestOptions)

        const complaints = await response.json()
        console.log(complaints)

        setComplaints(complaints)
        
    }

    function dislpayComplaints(complaints){
        return(complaints.map( (complaint) => {
                                            
            return(<tr>
                <td>{complaint[0]}</td>
                <td>{complaint[1]}</td>
                <td>
                    <input type="button" className="btn btn-primary" value='Clear'/>
                </td>
            </tr>)
            }))
    }

    useEffect(() => getComplaints(),[])

    return(
            <div className="modal-container">
                <div className="modal-box col-10 col-sm-6">
                    <h2><strong>Complaints</strong></h2>

                    <div id="complaints-container mt-1">
                        <div class="row justify-content-center">

                            <div className="complaints-table row justify-content-center mb-2">
                                <div className="complaints-table-wrapper col-12">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Complaint</th>
                                                <th>Filed by</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dislpayComplaints(complaints)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary" value="Done" onClick={() => props.changeModal('none')} />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default Complaints;