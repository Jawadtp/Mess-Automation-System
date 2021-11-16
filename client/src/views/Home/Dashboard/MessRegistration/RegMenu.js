import React, {useEffect, useState} from 'react'
import MessDetails from './MessDetails'
import './MessReg.css'
const RegMenu = (props) => 
{

    const [messes, setMesses] = useState([])
    const [selectedMess, setSelectedMess] = useState(-1)

    async function getAllMesses()
    {
        const requestOptions = 
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }

        const response = await fetch('http://localhost:5000/messes', requestOptions)
        const data = await response.json()
        console.log('Messes fetched')
        console.log(data)
        setMesses(data)
    }

    useEffect(() => 
    {
       getAllMesses()
    },[]);

    return <div className="custom-modal">
                <div className="modal-container">
                    <div className="modal-box">
                        <h2><strong>Mess Registration</strong></h2>

                        <div className="modal-body">
                            {!messes.length?'Loading available messes..':
                                <select class="form-select" id="messSelect" onChange={()=>{setSelectedMess(document.getElementById("messSelect").value)}}>
                                    <option value="-1" selected>Choose a mess</option>
                                    {messes.map((mess)=> <option value={mess[0]}>{mess[1]}</option>)}
                                </select>
                            }

                            {selectedMess==-1?'':<MessDetails messid={selectedMess}/>}
                            
                        </div>
                        <div id="add-extras-container">
                            <div class="row justify-content-center mt-1">
                                <div class="col-auto">
                                    <input type="button" class="form-control btn btn-primary" value="Hide" onClick={()=>props.showMessRegModal(false)}/>
                                </div>
                                <div class="col-auto">
                                    <input type="button" class="form-control btn btn-primary" value="Register" />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
}

export default RegMenu
