
function StudentInfo(props){
    return(
            <div className="modal-container">
                <div className="modal-box">
                    <h2><strong>Student Info</strong></h2>

                    <div id="student-info-container">
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