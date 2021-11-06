import './App.css';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import {useState, useEffect} from 'react'
import { setUserInfo} from './features/user'
import { useDispatch } from 'react-redux';


const App = () => {

  const dispatch = useDispatch()

  const [view, setView] = useState('login')

  useEffect(() => 
  {
    const token = localStorage.getItem('token')

    validateToken(token)
  })

  async function validateToken(token)
  {
    const opts = 
    {
        headers: 
        {
            Authorization: 'Bearer ' + token
        }
    }

    const response = await fetch('http://localhost:5000/validate', opts)
    if(response['status']!=200) return //Token aint valid
    let data = await response.json()

    data['token']=token
    dispatch(setUserInfo( data))
    console.log(data)
    setView('home')
}

  return (
    view==='login'?<Login validateToken={validateToken}/>:<Home/>
  );
}


export default App;
