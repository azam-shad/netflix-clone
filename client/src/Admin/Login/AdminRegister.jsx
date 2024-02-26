import React from 'react'
import CountryCity from '../assets/AdminRegisterCompo/CountryCity';
import useForm from '../assets/AdminRegisterCompo/useForm';
import '../assets/AdminRegisterCompo/forms.scss'
import { Button } from '@mui/material';
import { Send } from '@mui/icons-material';
import { Alert, Form } from 'react-bootstrap';

const AdminRegister = () => {
    const { handleChange, inputs, handleSubmit, errors, success } = useForm();
    return (
        <div className='text-black  registerMain'>
            {success && typeof success === 'string' && <Alert variant='success' className='alertMessage mt-3'>{success}</Alert>}

            {errors && typeof errors === 'string' && <Alert variant='danger' className='alertMessage mt-3'>{errors} </Alert>}

            <div className="form__row" onSubmit={handleSubmit}>
                <form >
                    {/* <SelectReason /> */}
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={inputs.firstname}
                        onChange={handleChange}
                        // className={`${errors.firstname} ? "error" : "success"`}
                        // onBlur={handleSubmit}
                        autoComplete="off"
                        required
                    />

                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name (in english)*"
                        value={inputs.lastname}
                        onChange={handleChange}
                        // className={`${errors.lastname} ? "error" : "success"`}
                        // onBlur={handleSubmit}
                        autoComplete="off"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        value={inputs.email}
                        onChange={handleChange}
                        // className={`${errors.email} ? "error" : "success"`}
                        // onBlur={handleSubmit}
                        autoComplete="off"
                        required
                    />
                    {/* <Form.Select aria-label="Default select" name="gender" className='' value={inputs.gender} onChange={handleChange} required>
                        <option value='' disabled >Select Gender</option>
                        <option value="male">Male</option>
                        <option value="femail">Female</option>
                        <option value="othe">Other</option>
                    </Form.Select> */}
                    <select name="gender" value={inputs.gender} onChange={handleChange} required>
                        <option value="" disabled selected>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {/* <input
                        type="text"
                        name="gender"
                        placeholder="gender"
                        value={inputs.gender}
                        onChange={handleChange}
                        // className={`${errors.mobile} ? "error" : "success"`}
                        // onBlur={handleSubmit}
                        autoComplete="off"
                        required
                    /> */}
                    <input
                        type="number"
                        name="countryCode"
                        placeholder="Country Code Example (+91)"
                        value={inputs.countryCode}
                        onChange={handleChange}
                        // className={`${errors.mobile} ? "error" : "success"`}
                        // onBlur={handleSubmit}
                        autoComplete="off"
                        required
                    />
                    <input
                        type="number"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={inputs.mobile}
                        onChange={handleChange}
                        // className={`${errors.mobile} ? "error" : "success"`}
                        // onBlur={handleSubmit}
                        autoComplete="off"
                        required
                    />
                    <CountryCity handleChange={handleChange} inputs={inputs} />
                    <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={inputs.city}
                        onChange={handleChange}
                        // className={`${errors.postbox} ? "error" : "success"`}
                        // onBlur={handleSubmit}
                        autoComplete="off"
                    />

                    <input
                        type="text"
                        name="zip_code"
                        placeholder="Zip Code *"
                        value={inputs.zip_code}
                        onChange={handleChange}
                        // className={`${errors.postbox} ? "error" : "success"`}
                        // onBlur={handleSubmit}
                        autoComplete="off"
                    />
                    <input
                        type="textarea"
                        name="street"
                        placeholder="Address"
                        value={inputs.street}
                        onChange={handleChange}
                        className=""
                        autoComplete="off"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password *"
                        value={inputs.password}
                        onChange={handleChange}
                        // className={`${errors.password} ? "error" : "success"`}
                        // onBlur={handleSubmit}
                        autoComplete="off"
                        required
                    />
                    <input
                        type="password"
                        name="password2"
                        placeholder="Confirm Password *"
                        value={inputs.password2}
                        onChange={handleChange}
                        // className={`${errors.password2} ? "error" : "success"`}
                        // onBlur={handleSubmit}
                        autoComplete="off"
                        required
                    />
                    <div className="form-group">
                        <button type="submit" className="btn btn-danger btn-block text-center"> Create Admin  Account  </button>
                    </div>
                    {/* <Button variant="outlined" color='error' type='submit'>Submit</Button> */}
                </form>
            </div>
        </div>
    )
}

export default AdminRegister
