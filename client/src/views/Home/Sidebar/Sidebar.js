import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './Sidebar.css'

const Sidebar = (props) => 
{
    const user = useSelector((state)=> state.user.value)
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

                <li className={`nav-item ${props.view==='dashboard'?'selected':''}`}>
                    <a className="navBtn nav-link" style={{'color':'white'}} onClick={() => onNavLinkClick('dashboard')} >
                        <i class="bi bi-house-fill"></i>
                        <span class="link-text">Home</span>
                    </a>
                    
                </li>

                <li className={`nav-item ${props.view==='details'?'selected':''}`}>
                    <a class="navBtn nav-link" style={{'color':'white'}} onClick={() => onNavLinkClick('details')}>
                        <i class="bi bi-info-circle-fill"></i>
                        <span class="link-text">{user['role']==='student'?'Details':'Menu'}</span>
                    </a>
                </li>

                {/* <li className={`nav-item ${props.view==='info'?'selected':''}`}>
                    <a className="navBtn nav-link" style={{'color':'white'}} onClick={() => onNavLinkClick('info')}>
                        <i class="bi bi-info-circle-fill"></i>
                        <span class="link-text">Info</span>
                    </a>
                </li> */}
                
                <li className={`nav-item ${props.view==='manage'?'selected':''}`}>
                    <a className="navBtn nav-link" style={{'color':'white'}} onClick={() => onNavLinkClick('manage')}>
                        <i class="bi bi-gear-fill"></i>
                        <span class="link-text">Manage</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a href="#" class="nav-link" style={{'color':'white'}} onClick={() => onNavLinkClick('logout')}>
                        <i class="bi bi-box-arrow-right"></i>
                        <span class="link-text logout">Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar


