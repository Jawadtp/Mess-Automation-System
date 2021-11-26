import { useSelector } from 'react-redux'
import './addExtras.css'

function AddExtras(props){

    const user = useSelector((state)=> state.user.value)

    async function addExtraAmount(rollNo,extras){

        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rollNo: rollNo,
                extras: extras,
                managerID: user['rollno']
            })
        }

        const response = await fetch('http://localhost:5000/add-extras', requestOptions)

        const data = await response.json()
        console.log(data)

        if(data !== 'Error'){
            var p = document.createElement("p");
            var consoleMessage = document.createTextNode(`${data}`);
            p.appendChild(consoleMessage);

            let consoleMessages = document.querySelector('.add-extras-console');

            consoleMessages.insertBefore(p,consoleMessages.childNodes[0])

            for(let item of document.querySelectorAll('.add-extras-input'))
                item.value=''
        }
        
    }

    return(
            <div className="modal-container">
                <div className="modal-box  col-10 col-sm-6 col-md-4">
                    <div className="add-extras-content">
                        <h2><strong>Add Extras</strong></h2>

                        <form className="form add-extras-form">
                            <input type="text"  className='add-extras-input' placeholder="Student Roll Number"/>
                            <input type="number" className='add-extras-input' placeholder="Extras amount" min='0'/>
                        </form>

                        <div className='add-extras-console text-muted'>
                            <hr style={{margin: '0'}}/>
                            <p>Console Messages</p>
                        </div>

                        <div class="row justify-content-center mt-1">
                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary" value="Cancel" onClick={() => props.changeModal('none')} />
                            </div>

                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary" value="Add" onClick={() => {
                                    let rollNo = document.querySelectorAll('.add-extras-input')[0].value;
                                    let extras = document.querySelectorAll('.add-extras-input')[1].value;
                                    
                                    if (! /^\d+$/.test(extras))
                                        alert('Extras should be a non negative number')
                                    else
                                        addExtraAmount(rollNo,extras)
                                    }} />
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
    )
}

export default AddExtras;