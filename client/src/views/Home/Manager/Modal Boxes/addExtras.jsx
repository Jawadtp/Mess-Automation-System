import './addExtras.css'

function AddExtras(props){

    function addExtraAmount(){

    }

    return(
            <div className="modal-container">
                <div className="modal-box  col-10 col-sm-6 col-md-4">
                    <div className="add-extras-content">
                        <h2><strong>Add Extras</strong></h2>

                        <input type="text"  className='add-extras-input' placeholder="Student Roll Number"/>

                        <input type="number" className='add-extras-input' placeholder="Extras amount" min='0'/>

                        <div className='add-extras-console text-muted'>
                            <p>Console Messages:</p>
                        </div>

                        <div class="row justify-content-center mt-1">
                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary" value="Cancel" onClick={() => props.changeModal('none')} />
                            </div>

                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary" value="Add" onClick={() => addExtraAmount()} />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default AddExtras;