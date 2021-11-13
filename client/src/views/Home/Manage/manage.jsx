import './manage.css'

function Manage(){

    function displayModal(option){
        document.getElementById(option).style.display = 'block';
    }

    function cancelModal(option){
        document.getElementById(option).style.display = 'none';
    }

    return(
        <div className="manageWrapper">
            <h3><strong>Choose Options to Manage</strong></h3>
            <div className="row options-row">

                <div className="col-9 col-md-4 col-xl-3 options">
                    <div className="options-card">
                        <div className='col-auto icon-container'>
                            <i className='bi bi-chat-fill'></i>
                        </div>

                        <div className="col-6 options-text">
                            <p>Leave Requests</p>
                        </div>
                    </div>
                </div>

                <div className="col-9 col-md-4 col-xl-3 options">
                    <div className="options-card">
                            <div className='col-auto icon-container'>
                                <i className='bi bi-info-circle-fill'></i>
                            </div>

                            <div className="col-6 options-text">
                                <p>Student Info</p>
                            </div>
                        </div>
                </div>

                <div className="col-9 col-md-4 col-xl-3 options">
                    <div className="options-card">
                        <div className='col-auto icon-container'>
                            <i className='bi bi-x'></i>
                        </div>

                        <div className="col-6 options-text">
                            <p>End Current Fee Period</p>
                        </div>
                    </div>
                </div>

                <div className="col-9 col-md-4 col-xl-3 options" onClick={() => displayModal('announcement-modal')}>
                    <div className="options-card">
                        <div className='col-auto icon-container'>
                            <i className='bi bi-megaphone-fill'></i>
                        </div>

                        <div className="col-6 options-text">
                            <p>Make an Announcement</p>
                        </div>
                    </div>
                </div>

                <div className="custom-modal" id='announcement-modal'>
                    <div className="modal-container">
                        <div className="modal-box">
                            <h2><strong>Create Announcement</strong></h2>

                            <form id="announcement-form">
                                <div class="form-group p-2">
                                    <input type="text" name="announcement" class="form-control" placeholder="Enter announcement"/>
                                </div>

                                <div class="row justify-content-center mt-1">
                                    <div class="col-5">
                                        <input type="button" id="cancel" class="form-control btn btn-primary" value="Cancel" onClick={() => cancelModal('announcement-modal')} />
                                    </div>
                                    <div class="col-5">
                                        <input type="submit" class="form-control btn btn-primary" value="Submit"/>
                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>

                <div className="col-9 col-md-4 col-xl-3 options">
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

            
        </div>
    )
}

export default Manage