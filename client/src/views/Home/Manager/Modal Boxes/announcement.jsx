
function Announcement(props){
    return(
            <div className="modal-container">
                <div className="modal-box">
                    <h2><strong>Create Announcement</strong></h2>

                    <form id="announcement-form">
                        <div class="form-group p-2">
                            <input type="text" name="announcement" class="form-control" placeholder="Enter announcement"/>
                        </div>

                        <div class="row justify-content-center mt-1">
                            <div class="col-5">
                                <input type="button" class="form-control btn btn-primary" value="Cancel" onClick={() => props.changeModal('none')} />
                            </div>
                            <div class="col-5">
                                <input type="submit" class="form-control btn btn-primary" value="Submit"/>
                            </div>
                        </div>
                    </form>
                    
                </div>
            </div>
    )
}

export default Announcement;