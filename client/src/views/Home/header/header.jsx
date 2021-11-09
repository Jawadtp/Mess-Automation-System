import './header.css'

function Header(props){
    return(
        <div className='header row text-center'>
            <div className='col-auto text-muted'>
                Mess Automation System
            </div>

            <div className="col">                
            </div>

            <div className='col-auto headerIcon'>
                <div className='row justify-content-end'>
                    <div className='px-1 col-auto'>
                        <i className='bi bi-list'></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header