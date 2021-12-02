import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function EndFeePeriod(props){

    const user = useSelector((state)=> state.user.value)
    const [feesLastCalculated,setFeesLastCalculated] = useState('')

    async function getFeesLastCalculated(){
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messID: user['messid'] })
        }

        const response = await fetch('http://localhost:5000/get-fees-last-calculated', requestOptions)

        const data = await response.json()
        console.log(data)
        setFeesLastCalculated(data[0][0].slice(0,-12))
    }

    useEffect(() => getFeesLastCalculated(),'');

    return(
            <div className="modal-container">
                <div className="modal-box">
                    <h2><strong>End Fee Period</strong></h2>

                    <div className="end-fees-period text-center">

                        <div className="last-fees-calculated">
                            <p className="text-muted">Last fee calculated on:</p>
                            <h5><strong>{feesLastCalculated}</strong></h5>
                        </div>

                        <div className="warning text-muted">
                            <p>Are you sure you want to continue?</p>
                            <p>This action is irreversible</p>
                        </div>
                        
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