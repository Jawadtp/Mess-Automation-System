import React from 'react';
import './modal.css';
import RequestLeave from './Modal Boxes/requestLeave';
import RegComplaint from './Modal Boxes/regComplaint';

function Modal(props){


    function selectModal(modal){
        switch(modal){
            case 'requestLeave':
                return(<RequestLeave changeModal={props.changeModal}/>);
            case 'regComplaint':
                return(<RegComplaint changeModal={props.changeModal}/>);
            default:
                return;
        }
    }

    return props.modal === 'none'? '' :
        <div className="custom-modal">
            {selectModal(props.modal)}
        </div>

}

export default Modal