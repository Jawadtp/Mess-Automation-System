import React from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setUserInfo, removeUserInfo} from '../../features/user';
import { initialStateValue } from '../../constants/constants';

import './Login.css';

const Login = (props) => {

    const dispatch = useDispatch()

    async function onFormSubmit(event)
    {
        event.preventDefault()
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value

        console.log(email,password)
        
        const requestOptions = 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        }

        const response = await fetch('http://localhost:5000/login', requestOptions)
        const data = await response.json()
        console.log(data)

        if (!('error' in data)) //User entered valid credentials.
        {
            dispatch(setUserInfo( {...initialStateValue, token: data['access_token']}))
            localStorage.setItem('token', data['access_token'])
            props.validateToken(data['access_token'])
        }
        else{
            alert("Invalid login credentials")
        }
    }

    return (
        // <div className="loginFormWrapper">
        //     <Form>
        //         <Form.Group className="mb-3" controlId="formBasicEmail">
        //             <Form.Label>Email</Form.Label>
        //             <Form.Control type="email" id="emailInput" placeholder="Enter email" />
        //         </Form.Group>

        //         <Form.Group className="mb-3" controlId="formBasicPassword">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control type="password" id="passwordInput" placeholder="Password" />
        //         </Form.Group>

        //         <Button id="submitBtn" variant="primary" type="button" onClick={onSubmitClick}>
        //             Submit
        //         </Button>
        //     </Form>
        // </div>

        <div class="container">
            <div class="row justify-content-center d-flex flex-column min-vh-100 align-items-center">
                <div class="col-9 col-sm-8 col-lg-6 contact-form justify-content-center">
                    <h2 id='heading'>Login</h2>
                    <div class="row justify-content-center text-center">
                        <form onSubmit={onFormSubmit}>
                            <div class="form-group form-floating">
                                <input type="text" required name="username" class="form-control username" placeholder="email" id="emailInput"/>
                                <label for="email">Email</label>
                            </div>
                            <div class="form-group form-floating">
                                <input type="password" required name="password" class="form-control password" id="passwordInput" placeholder='password'/>
                                <label for="password">Password</label>
                            </div>

                            <span>
                                <Button id="submitBtn" variant="primary" type="submit">
                                    Submit
                                </Button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
