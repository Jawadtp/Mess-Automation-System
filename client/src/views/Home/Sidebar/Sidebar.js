import {BsHouseFill,BsFillPersonFill,BsFillInfoCircleFill,BsBoxArrowRight} from 'react-icons/bs'
import './Sidebar.css'


const Sidebar = (props) => 
{

    function onNavLinkClick(linkName)
    {
        if(linkName==='logout')
        {
            localStorage.removeItem('token')
            window.location.reload()
        }
        props.setView(linkName)
    }

    return(
        <div class="sidebar">
            <ul class="sidebar-list">
                <li class="nav-item">
                    <p class='logo'>MESS</p>
                </li>

                <li class="nav-item">
                    <button className="navBtn" style={{'color':'white'}} onClick={() => onNavLinkClick('dashboard')} >
                        <BsHouseFill className='icon'/>
                        <span class="link-text">Home</span>
                    </button>
                </li>

                <li class="nav-item">
                    <button class="navBtn" style={{'color':'white'}} onClick={() => onNavLinkClick('account')}>
                        <BsFillPersonFill className='icon'/>
                        <span class="link-text">Account</span>
                    </button>
                </li>

                <li class="nav-item">
                    <button className="navBtn" style={{'color':'white'}} onClick={() => onNavLinkClick('info')}>
                        <BsFillInfoCircleFill className='icon' />
                        <span class="link-text">Info</span>
                    </button>
                </li>

                <li class="nav-item">
                    <a href="#" class="nav-link" style={{'color':'white'}} onClick={() => onNavLinkClick('logout')}>
                        <BsBoxArrowRight className='icon' />
                        <span class="link-text logout">Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar


