import { useSelector } from "react-redux";

function Announcement(props){

    const user = useSelector((state) => state.user.value);

    async function submitAnnouncement(announcement){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                managerID: user['rollno'],
                announcement: announcement
            })
        }

        const response = await fetch('http://localhost:5000/post-announcement',requestOptions);

        let title = document.querySelector('.modalContent strong');

        title.textContent = 'Announcement created';
        title.style.width = '50%'
        
        document.querySelector('textarea').style.display = 'none';

        let btn = document.querySelector('.btn');
        btn.value = 'Done';
        btn.style.marginTop = '2rem'

        document.querySelector('.submit-announcement').style.display = 'none';

        
    }

    return(
            <div className="modal-container">
                <div className="modal-box col-10 col-sm-6 col-md-4">

                    <div class="modalContent">
                            
                        <h2><strong>Create Announcement</strong></h2>
                        <textarea className="m-2 " cols="30" rows="10" placeholder="Announcement"></textarea>
                        
                        <div className="row justify-content-center">
                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary" value="Cancel" onClick={() => props.changeModal('none')} />
                            </div>
                            <div class="col-auto">
                                <input type="button" class="form-control btn btn-primary submit-announcement" value="Submit" onClick={() => {
                                    let announcement = document.getElementsByTagName('textarea')[0].value;
                                    submitAnnouncement(announcement)}} />
                            </div>
                        </div>
                    </div>

                </div>
                    
            </div>
    )
}

export default Announcement;