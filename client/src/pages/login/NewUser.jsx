import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faPhone, faUser, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap';
import './register.scss'
import { Link, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '../Context/AuthContext';

const NewUser = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { isLoggedIn } = useAuth();
    const [selectedGender, setSelectedGender] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [userEmail, setUserEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [confrimPassword, setConfrimPassword] = useState('');
    const history = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            history('/dashboard')
        }

    }, [isLoggedIn, history])

    const CreateUser = async (e) => {
        e.preventDefault();
        try {
            if (loginPassword !== confrimPassword) {
                setError('Password Does not Match');
                setSuccess('');
                return;
            }

            const body = { selectedGender, countryCode, FirstName, LastName, userEmail, phoneNumber, loginPassword }
            const response = await fetch(`https://netflix-clone-q429.onrender.com/auth/createNewAccount`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),

            });
            const parseRes = await response.json();
            if (parseRes.message === 'Account Create successfully') {
                setSuccess(parseRes.message);
                setError('');
                const { user_id } = parseRes.user_id;
                localStorage.setItem('userId', user_id);
                setTimeout(() => {
                    history('/login');
                }, 2000);
            } else {
                setError('email allready exits');
                setSuccess('');
            }

        } catch (err) {
            console.error(err.message);
            setError('An error occurred while creating the account.');
            setSuccess('');
        }

        // setError('');
        setSelectedGender('');
        setCountryCode('');
        setFirstName('');
        setLastName('');
        setUserEmail('');
        setPhoneNumber('');
        setLoginPassword('');
        setConfrimPassword('');
    }
    return (
        <>
            {success && <Alert variant='success' className='alertMessage'>{success}</Alert>}
            {error && <Alert variant='danger' className='alertMessage'>{error} </Alert>}
            <div className="maincontainer container" onSubmit={CreateUser}>
                <div className="card bg-light">
                    <article className="card-body mx-auto" >
                        <h4 className="card-title mt-3 text-center">Create Account</h4>
                        <p className="text-center">Get started with your free account</p>
                        <form>
                            <div className="form-group input-group">
                                <div className="input-group-prepend mb-0">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                                </div>
                                <input name="" className="form-control mb-1" placeholder="First Name" type="text" value={FirstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend mb-0">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                                </div>
                                <input name="" className="form-control mb-1" placeholder="Last name" type="text" value={LastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faEnvelope} /> </span>
                                </div>
                                <input name="" className="form-control mb-1" placeholder="Email address" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faPhone} /> </span>
                                </div>
                                <Form.Select aria-label="Default" className='custom-select mb-1' value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)} style={{ maxWidth: '100px', width: '100%' }} required>
                                    <option value='' disabled>select</option>
                                    <option value="+91">+91</option>
                                </Form.Select>

                                <input name="" className="form-control mb-1" placeholder="Phone Number" type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faLock} /> </span>
                                </div>
                                <input className="form-control mb-1" placeholder="Create password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faLock} /> </span>
                                </div>
                                <input className="form-control mb-1" placeholder="Repeat password" type="password" value={confrimPassword} onChange={(e) => setConfrimPassword(e.target.value)} required />
                            </div>
                            <div className="form-group input-group custom-select mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <FontAwesomeIcon icon={faVenusMars} /></span>
                                </div>
                                <Form.Select aria-label="Default select" className='' value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} required>
                                    <option value='' disabled >Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="femail">Female</option>
                                    <option value="othe">Other</option>
                                </Form.Select>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-danger btn-block"> Create Account  </button>
                            </div>
                            <p className="text-center mt-1">Have an account? <Link to={'/login'}>Log In</Link> </p>
                        </form>
                    </article>
                </div>
            </div>
        </>
    )
}

export default NewUser

