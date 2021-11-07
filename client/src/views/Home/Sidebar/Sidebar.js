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
            return
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
                    <a className="navBtn nav-link" style={{'color':'white'}} onClick={() => onNavLinkClick('dashboard')} >
                            <BsHouseFill className='icon'/>
                            <span class="link-text">Home</span>
                    </a>
                    
                </li>

                <li class="nav-item">
                    <a class="navBtn nav-link" style={{'color':'white'}} onClick={() => onNavLinkClick('details')}>
                        <BsFillPersonFill className='icon'/>
                        <span class="link-text">Details</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a className="navBtn nav-link" style={{'color':'white'}} onClick={() => onNavLinkClick('info')}>

                        <BsFillInfoCircleFill className='icon' />
                        <span class="link-text">Info</span>
                    </a>
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


