
function EndFeePeriod(props){
    return(
            <div className="modal-container">
                <div className="modal-box">
                    <h2><strong>End Current Fee Period</strong></h2>

                    <div id="end-fee-period-container">
                        <div class="row justify-content-center mt-1">
                            <div class="col">
                                <input type="button" class="form-control btn btn-primary" value="Cancel" onClick={() => props.changeModal('none')} />
                            </div>
                            <div class="col">
                                <input type="submit" class="form-control btn btn-primary" value="End"/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default EndFeePeriod;