import './regComplaint.css'
import {useSelector} from 'react-redux'

function RegComplaint(props){

    const user = useSelector((state) => state.user.value)
    async function submitComplaint(complaint){
        // post complaint
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rollNo: user['rollno'],
                messID: user['messid'],
                complaint: complaint
            })
            
        }

        await fetch('http://localhost:5000/post-complaint', requestOptions);
        // const data = await response.json();

        let title = document.querySelector('.modalContent strong');

        title.textContent = 'Complaint Registered';
        title.style.width = '50%'
        
        document.querySelector('textarea').style.display = 'none';

        let btn = document.querySelector('.btn');
        btn.value = 'Done';
        btn.style.marginTop = '2rem'

        document.querySelector('.submit-complaint').style.display = 'none';

    }

    return(
            <div className="modal-container">
                <div className="modal-box col-10 col-sm-6 col-md-4">

                    <div class="modalContent">
                            
                        <h2><strong>Register Complaint</strong></h2>
                        <textarea cols="30" rows="10" placeholder="Describe the complaint"></textarea>
                        
                        <div className="row justify-content-center">
                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary" value="Cancel" onClick={() => props.changeModal('none')} />
                            </div>
                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary submit-complaint" value="Submit" onClick={() => {
                                    let complaint = document.getElementsByTagName('textarea')[0].value;
                                    submitComplaint(complaint)}} />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default RegComplaint;