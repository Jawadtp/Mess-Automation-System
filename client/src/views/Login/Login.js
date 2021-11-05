import React from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setUserInfo, removeUserInfo} from '../../features/user';
import { initialStateValue } from '../../constants/constants';

import './Login.css';

const Login = (props) => {

    const dispatch = useDispatch()

    async function onSubmitClick()
    {
        const email = document.getElementById('emailInput').value
        const password = document.getElementById('passwordInput').value

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
    }

    return (
        <div className="loginFormWrapper">

        
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" id="emailInput" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" id="passwordInput" placeholder="Password" />
                </Form.Group>

                <Button id="submitBtn" variant="primary" type="button" onClick={onSubmitClick}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login
