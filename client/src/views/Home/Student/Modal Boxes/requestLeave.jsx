import { useSelector } from 'react-redux'
import './requestLeave.css'
function RequestLeave(props){

    const user = useSelector((state) => state.user.value)
    
    async function submitLeaveRequest(request){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rollNo: user['rollno'],
                request: request
            })
        }

        const response = await fetch('http://localhost:5000/submit-leave-request',requestOptions)

        let title = document.querySelector('.modalContent strong');

        title.textContent = 'Leave Request Submitted';
        title.style.width = '50%'
        
        document.querySelector('textarea').style.display = 'none';
        document.querySelector('.start-date').parentElement.style.display = 'none'
        document.querySelector('.end-date').parentElement.style.display = 'none'
        
        let btn = document.querySelector('.btn');
        btn.value = 'Done';

        document.querySelector('.submit-request').parentElement.style.display = 'none'

    }

    return(
            <div className="modal-container">
                <div className="modal-box col-10 col-sm-8 col-md-6">

                    <div className="modalContent">
                            
                        <h2><strong>Request Leave</strong></h2>
                        <div className="calenders row">
                            <div className="col-auto ">
                                <label>Starting Date:</label><br />
                                <input type="date" className='start-date' required/>
                            </div>
                            <div className="col-auto">
                                <label>End Date:</label><br />
                                <input type="date" className='end-date' required/>
                            </div>
                        </div>
                        <div className='reason mb-3'>
                            <textarea className="leave-req-text-area" cols="30" rows="10" placeholder="Enter reason"/>
                        </div>
                        <div class="row">
                            <div className="col">
                                <input type="button" class="form-control btn btn-primary" value="Cancel" onClick={() => props.changeModal('none')} />
                            </div>
                            <div className="col">
                                <input type="button" class="form-control btn btn-primary submit-request" value="Submit" onClick={() => {
                                    let startDate = document.querySelector('.start-date').value;
                                    let endDate = document.querySelector('.end-date').value;
                                    let reason = document.getElementsByClassName('leave-req-text-area')[0].value

                                    if (startDate == '' || endDate == '' || reason == ''){
                                        alert('Provide all details!')
                                    }else{
                                        let request = {
                                            startDate: startDate,
                                            endDate: endDate,
                                            reason: reason
                                        }
                                        submitLeaveRequest(request)
                                    }}} />
                            </div>
                
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default RequestLeave;