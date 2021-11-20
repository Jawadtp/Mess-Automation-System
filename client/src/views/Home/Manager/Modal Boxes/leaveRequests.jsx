import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function LeaveRequests(props){

    const user = useSelector((state) => state.user.value);

    const [requests,setRequests] = useState([]);

    async function getLeaveRequests(){
        
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ managerID: user['rollno'] })
        }

        let response = await fetch('http://localhost:5000/get-leave-requests', requestOptions)

        const leaveRequests = await response.json();
        let orderedLeaveRequests = leaveRequests.map((request) => {
            return {
                'roll_no': request[0],
                'start_date': request[1],
                'end_date': request[2],
                'reason': request[3],
                'status': request[4]
            }
        })
        
        console.log(leaveRequests)
        console.log (orderedLeaveRequests)

        setRequests(orderedLeaveRequests)
        
    }

    function displayLeaveRequests(leaveRequests){
        return(leaveRequests.map( (request) => {
                                            
            return(<tr>
                <td>{request['roll_no']}</td>
                <td>{request['start_date'].slice(5,-12)}</td>
                <td>{request['end_date'].slice(5,-12)}</td>
                <td>{request['reason']}</td>
                <td>
                    {request['status'] === 0? 
                    <div className="d-flex flex-column align-items-center">
                        <input type="button" id={`${request[0]}`} className="btn btn-primary m-1" value='Approve' onClick={() => requestAction(request,1)}/>

                        <input type="button" id={`${request[0]}`} className="btn btn-primary" value='Reject' onClick={() => requestAction(request,-1)}/>
                    </div>
                    :request['status'] === 1?
                    <div className="text-muted text-center">Accepted</div>:<div className="text-muted text-center">Rejected</div>}
                </td>
            </tr>)
            }))
    }

    async function requestAction(request,status){

        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                rollNo: request['roll_no'],
                startDate: request['start_date']
            })
        }

        let response = await fetch('http://localhost:5000/update-leave-requests', requestOptions)

        
    }

    useEffect(() => getLeaveRequests(),[])

    return(
            <div className="modal-container">
                <div className="modal-box col-10 col-sm-8 col-md-6">
                    <h2><strong>Leave Requests</strong></h2>

                    <div id="leave-requests">

                        <div class="d-flex flex-column align-items-center">

                            <div className="complaints-table row justify-content-center mb-2">
                                <div className="complaints-table-wrapper col-12">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Roll Number</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Reason</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayLeaveRequests(requests)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="w-25">
                                <input type="button" class="form-control btn btn-primary" value="Done" onClick={() => props.changeModal('none')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default LeaveRequests;