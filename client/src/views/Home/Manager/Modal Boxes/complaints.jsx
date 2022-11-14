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
        // console.log(complaints)
        if (complaints.length == 0)
            setComplaints(undefined)
        else setComplaints(complaints)
        
    }

    async function resolveComplaint(complaint){
        
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ complaintID: complaint[0] })
        }

        const response = await fetch('http://localhost:5000/update-complaint', requestOptions);

        const data = await response.json();

        document.getElementById(`${complaint[0]}`).children[0].setAttribute('hidden','true')
        document.getElementById(`${complaint[0]}`).children[1].removeAttribute('hidden')

    }

    function dislpayComplaints(complaints){
        if(!complaints){
            return(<tr>
                <td colSpan={5}><h6 style={{'color':'grey'}}>No complaints to show</h6></td>
            </tr>)
        }
        return(complaints.map( (complaint) => {
                                            
            return(<tr>
                <td style={{minWidth: '15rem'}}>{complaint[1]}</td>
                <td>{complaint[2]}</td>
                <td>
                    {complaint[3] === 0?
                    <div id={`${complaint[0]}`}>
                        <input type="button" className="btn btn-primary" value='Resolve' onClick={() => resolveComplaint(complaint)}/>
                        <div className="on-resolve text-muted text-center" hidden>Resolved</div>
                    </div>
                    :
                    <div className="text-muted text-center">Resolved</div>}
                </td>
            </tr>)
            }))
    }

    useEffect(() => getComplaints(),[])

    return(
            <div className="modal-container">
                <div className="modal-box col-10 col-sm-8 col-md-6">
                    <h2><strong>Complaints</strong></h2>

                    <div id="complaints-container mt-1">
                        <div class="d-flex flex-column align-items-center">

                            <div className="table-wrapper">
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

                            <div class="w-25">
                                <input type="button" class="form-control btn btn-primary" value="Done" onClick={() => props.changeModal('none')} />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default Complaints;