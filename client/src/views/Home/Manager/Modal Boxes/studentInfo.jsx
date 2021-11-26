import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function StudentInfo(props){
    const user = useSelector((state) => state.user.value);

    const [studentInfo,setStudentInfo] = useState([]);

    async function getStudentInfo(){
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ managerID: user['rollno'] })
        }

        let response = await fetch('http://localhost:5000/get-student-info', requestOptions);

        const studentInfo = await response.json();

        let orderedStudentInfo = studentInfo.map((info) => {
            return {
                'rollNo': info[0],
                'name': info[1],
                'email': info[2],
            }
        })

        setStudentInfo(orderedStudentInfo);
    }

    useEffect(() => getStudentInfo(),[])

    function displayStudentInfo(studentInfo){
        return (studentInfo.map( (info) => {
            return(
                <tr>
                    <td>{info['rollNo']}</td>
                    <td>{info['name']}</td>
                    <td>{info['email']}</td>
                </tr>
            )
        }))
    }

    return(
            <div className="modal-container">
                <div className="modal-box col-10 col-sm-8 col-md-6">
                    <div className="modalContent">
                        <h2><strong>Student Info</strong></h2>
                        <div className="table-wrapper">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <td><strong>Roll Number</strong></td>
                                        <td><strong>Name</strong></td>
                                        <td><strong>Email</strong></td>
                                    </tr>
                                </thead>

                                <tbody>
                                {displayStudentInfo(studentInfo)}
                                </tbody>
                            </table>
                        </div>
                        <div class="row justify-content-center mt-1">
                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary" value="Done" onClick={() => props.changeModal('none')} />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default StudentInfo;