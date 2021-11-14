import React,{useState} from 'react'
import './manage.css'
import Modal from './modal'

function Manage(){

    const [modal, setModal] = useState('none');

    function changeModal(modalName){
        setModal(modalName);
    }

    return(
        <div className="manageWrapper">
            <h3><strong>Choose Options to Manage</strong></h3>
            <div className="row options-row">

                <div className="col-9 col-md-4 col-xl-3 options" onClick={() => setModal('leaveRequests')}>
                    <div className="options-card">
                        <div className='col-auto icon-container'>
                            <i className='bi bi-chat-fill'></i>
                        </div>

                        <div className="col-6 options-text">
                            <p>Leave Requests</p>
                        </div>
                    </div>
                </div>

                <div className="col-9 col-md-4 col-xl-3 options" onClick={() => setModal('addExtras')}>
                    <div className="options-card">
                        <div className='col-auto icon-container'>
                            <i className='bi bi-plus'></i>
                        </div>

                        <div className="col-6 options-text">
                            <p>Add Extras</p>
                        </div>
                    </div>
                </div>

                <div className="col-9 col-md-4 col-xl-3 options" onClick={() => setModal('studentInfo')}>
                    <div className="options-card">
                            <div className='col-auto icon-container'>
                                <i className='bi bi-info-circle-fill'></i>
                            </div>

                            <div className="col-6 options-text">
                                <p>Student Info</p>
                            </div>
                        </div>
                </div>

                <div className="col-9 col-md-4 col-xl-3 options" onClick={() => setModal('endFeePeriod')}>
                    <div className="options-card">
                        <div className='col-auto icon-container'>
                            <i className='bi bi-x'></i>
                        </div>

                        <div className="col-6 options-text">
                            <p>End Current Fee Period</p>
                        </div>
                    </div>
                </div>

                <div className="col-9 col-md-4 col-xl-3 options" onClick={() => {
                    setModal('announcement')
                }}>
                    <div className="options-card">
                        <div className='col-auto icon-container'>
                            <i className='bi bi-megaphone-fill'></i>
                        </div>

                        <div className="col-6 options-text">
                            <p>Make an Announcement</p>
                        </div>
                    </div>
                </div>


                <div className="col-9 col-md-4 col-xl-3 options" onClick={() => setModal('complaints')}>
                    <div className="options-card">
                        <div className='col-auto icon-container'>
                            <i className='bi bi-exclamation-circle-fill'></i>
                        </div>

                        <div className="col-6 options-text">
                            <p>Complaints</p>
                        </div>
                    </div>
                </div>
            </div>

            <Modal changeModal={changeModal} modal={modal} />
            
        </div>
    )
}

export default Manage