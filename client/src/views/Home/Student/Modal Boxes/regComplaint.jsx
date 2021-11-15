import './regComplaint.css'

function RegComplaint(props){

    function submitComplaint(complaint){
        // post complaint
    }

    return(
            <div className="modal-container">
                <div className="modal-box col-10 col-sm-6 col-md-4">

                    <div class="modalContent">
                            
                        <h2><strong>Register Complaint</strong></h2>
                        <textarea className="m-2 " cols="30" rows="10" placeholder="Describe the complaint"></textarea>
                        
                        <div className="row">
                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary" value="Cancel" onClick={() => props.changeModal('none')} />
                            </div>
                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary" value="Submit" onClick={() => {
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