import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './login.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Alert } from 'react-bootstrap';

const Login = () => {
    const history = useNavigate();
    const { isLoggedIn, login } = useAuth();
    const [loginError, setLoginError] = useState('');
    const [formData, setformData] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        if (isLoggedIn) {
            history('/dashboard')
        }

    }, [isLoggedIn, history])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Clear existing data in localStorage
            localStorage.clear();
            const responce = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const parseRes = await responce.json();
            if (parseRes.message === 'Logged in successfully') {
                const { token, user_id } = parseRes;
                localStorage.setItem('token', token);
                localStorage.setItem('user_id', user_id);
                login(token);
                history('/dashboard');
            } else {
                if (parseRes.message === 'Invalid Email ID') {
                    setLoginError('Email Id Invalid');
                } else if (parseRes.message === 'Invalid Password') {
                    setLoginError('Password Invalid');
                } else if (parseRes.message === 'User is Disable') {
                    setLoginError('User Is Disabled');

                }
                console.error('Login failed. Status:', responce.status);
                const errorMessage = await responce.text();
                console.error('Error message:', errorMessage);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    return (
        <>
            {loginError && <Alert variant='danger' className='alertMessage' >{loginError}</Alert>}
            <div className='text-black container bg-white containers' onSubmit={handleLogin}>

                <Form>
                    <Form.Group className="mb-3 formGroup " controlId="formBasicEmail">
                        <Form.Label className="mt-3">Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' value={formData.email} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3 formGroup" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' value={formData.password} onChange={handleInputChange} required />
                    </Form.Group>
                    {/* <Button variant="danger" type="submit" className='mb-2 btns'>
                    Login
                </Button> */}
                    <div className="form-group">
                        <button type="submit" className="btn btn-danger btn-block"> Login  </button>
                    </div>
                    <p className="text-center mt-1 mb-1 ">Don't have an account? <Link to={'/register'}  >Create one.</Link> </p>
                </Form>
            </div>
        </>


    )
}

export default Login
