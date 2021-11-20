import React from 'react'
import LeaveRequests from './Modal Boxes/leaveRequests';
import StudentInfo from './Modal Boxes/studentInfo';
import AddExtras from './Modal Boxes/addExtras';
import EndFeePeriod from './Modal Boxes/endFeePeriod';
import Announcement from "./Modal Boxes/announcement"
import Complaints from './Modal Boxes/complaints';
import '../modal.css'


function Modal(props){


    function selectModal(modal){
        switch(modal){
            case 'leaveRequests':
                return(<LeaveRequests changeModal={props.changeModal}/>);
            case 'studentInfo':
                return(<StudentInfo changeModal={props.changeModal}/>);
            case 'addExtras':
                return(<AddExtras changeModal={props.changeModal}/>);
            case 'endFeePeriod':
                return(<EndFeePeriod changeModal={props.changeModal}/>);
            case 'announcement':
                return(<Announcement changeModal={props.changeModal}/>);
            case 'complaints':
                return(<Complaints changeModal={props.changeModal}/>);
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