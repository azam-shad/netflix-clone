import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './Adminlogin.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/Context/AuthContext';
import { Alert } from 'react-bootstrap';

const AdminLogin = () => {
    const history = useNavigate();
    const { isAdminLogin, adminLogin } = useAuth();
    const [loginError, setLoginError] = useState('');
    const [dbAdminRole, setDbAdminRole] = useState([]);
    const [formData, setformData] = useState({
        email: '',
        password: '',
        adminRoles: '',
    });

    useEffect(() => {
        if (isAdminLogin) {
            history('/admin/dashboard')
        }

    }, [isAdminLogin, history]);

    useEffect(() => {
        const fetchAdminRoles = async () => {
            const response = await fetch(`https://netflix-clone-q429.onrender.com/view/getPlans`);
            const data = await response.json();
            console.log(data.adminRoles)
            setDbAdminRole(data.adminRoles)
            // setPlans(data)

        }
        fetchAdminRoles();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    }


    console.log('formData.adminRoles: ', formData.adminRoles)

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Clear existing data in localStorage
            localStorage.clear();
            const responce = await fetch('https://netflix-clone-q429.onrender.com/auth/adminLogin', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const parseRes = await responce.json();
            if (parseRes.message === 'Admin Logged in successfully') {
                const { admintoken, user_id } = parseRes;
                localStorage.setItem('admintoken', admintoken);
                localStorage.setItem('user_id', user_id);
                adminLogin(admintoken);
                history('/admin/dashboard')
                console.log('userId is: ', user_id)
            }
            else {
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
            {loginError && <Alert variant='danger' className='alertMessage mt-5' >{loginError}</Alert>}
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
                    <Form.Group className="mb-3 formGroup" controlId="formBasicPassword">
                        <Form.Label>Roles</Form.Label>
                        <Form.Select aria-label="Default select" className='' value={formData.adminRoles} onChange={handleInputChange} name='adminRoles' required>
                            <option value='' disabled >Select Gender</option>
                            {dbAdminRole.map((role) => (
                            <option key={role.role_id} value={role.role_name}>{role.role_name}</option>
                        ))}
                            {/* <option value="male">Male</option>
                            <option value="femail">Female</option>
                            <option value="othe">Other</option> */}
                        </Form.Select>
                    </Form.Group>

                    

                    <div className="form-group">
                        <button type="submit" className="btn btn-danger btn-block mb-2"> Login  </button>
                    </div>
                    {/* <p className="text-center mt-1 mb-1 ">Don't have an account? <Link to={'/admin/register'}  >Create one.</Link> </p> */}
                </Form>
            </div>
        </>
    )
}

export default AdminLogin




// <div className="form-group input-group custom-select mb-3">
//                                 <div className="input-group-prepend">
//                                     <span className="input-group-text"> <FontAwesomeIcon icon={faVenusMars} /></span>
//                                 </div>
                                
//                             </div>
