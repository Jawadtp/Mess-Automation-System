import React,{useState} from 'react'
import './manage.css'
import Modal from './studentModal'

function StudentManage(){

    const [modal, setModal] = useState('none');

    function changeModal(modalName){
        setModal(modalName);
    }

    return(
        <div className="manageWrapper">
            <h3><strong>Select Options</strong></h3>
            <div className="row options-row">

                <div className="col-9 col-md-4 col-xl-3 options" onClick={() => setModal('requestLeave')}>
                    <div className="options-card">
                        <div className='col-auto icon-container'>
                            <i className='bi bi-chat-fill'></i>
                        </div>

                        <div className="col-6 options-text">
                            <p>Request Leave</p>
                        </div>
                    </div>
                </div>

                <div className="col-9 col-md-4 col-xl-3 options" onClick={() => setModal('regComplaint')}>
                    <div className="options-card">
                        <div className='col-auto icon-container'>
                            <i className='bi bi-exclamation-circle-fill'></i>
                        </div>

                        <div className="col-6 options-text">
                            <p>Register Complaint</p>
                        </div>
                    </div>
                </div>
            </div>

            <Modal changeModal={changeModal} modal={modal} />
            
        </div>
    )
}

export default StudentManage;