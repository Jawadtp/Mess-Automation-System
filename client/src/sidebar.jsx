import {BsHouseFill,BsFillPersonFill,BsFillInfoCircleFill,BsBoxArrowRight} from 'react-icons/bs'
import './sidebar.css'

function Sidebar(props) {
    return(
        <div class="sidebar">
            <ul class="sidebar-list">
                <li class="nav-item">
                    <p class='logo'>MESS</p>
                </li>

                <li class="nav-item">
                    <a href="#" class="nav-link" style={{'color':'white'}} >
                        <BsHouseFill className='icon'/>
                        <span class="link-text">Home</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="#" class="nav-link" style={{'color':'white'}}>
                        <BsFillPersonFill className='icon'/>
                        <span class="link-text">Account</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="#" className="nav-link" style={{'color':'white'}}>
                        <BsFillInfoCircleFill className='icon' />
                        <span class="link-text">Info</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="#" class="nav-link" style={{'color':'white'}} >
                        <BsBoxArrowRight className='icon' />
                        <span class="link-text logout">Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar