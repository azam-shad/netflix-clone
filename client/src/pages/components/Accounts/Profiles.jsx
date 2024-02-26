import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Card, Form, Modal } from 'react-bootstrap';
import userDefaultImage from '../../assets/userImage/21104.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faBroom, faEdit, faLock, faMap, faSave } from '@fortawesome/free-solid-svg-icons';
import ChangePassword from './ChangePassword';
import './profile.scss';
import Loders from '../../assets/Common/Loders';


const Profiles = () => {
    const [showModal, setShowModal] = useState(false);
    const [clickedInput, setClickedInput] = useState(null);
    // const [isProfileEdited, setIsProfileEdited] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState();
    const [countryCode, setcountryCode] = useState();
    const [created, setCreated] = useState();
    const [lastLogin, setLastLogin] = useState();
    const [viewImages, setImages] = useState();
    const [address, setAddress] = useState('');
    const [cities, setCities] = useState('');
    const [states, setStates] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [gender, setGender] = useState('');
    const [showAlert, setshowAlert] = useState(false);
    const [editMode, setEditMode] = useState(false); // Step 1
    const [originalFirstName, setOriginalFirstName] = useState('');
    const [originalLastName, setOriginalLastName] = useState('');

    const [uploadedImage, setUploadedImage] = useState(null);
    const formRef = useRef();
    const fileInputRef = useRef();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setClickedInput(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            clearTimeout(timeout)
        };
    }, []);
    const updateAddress = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('user_id')
            const body = { userId, address, cities, states, country, zipCode, firstName, lastName }
            const responce = await fetch('https://netflix-clone-q429.onrender.com/updateDetails/updateAddress', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (responce.ok) {
                const data = await responce.json();
                console.log(data.message)
                if (data.message === 'update success full') {
                    setshowAlert(true);
                    setTimeout(() => {
                        setshowAlert(false);
                    }, 2000);
                }

            } else {
                console.error('Address upload failed. Status:', responce.status);
            }
        } catch (err) {
            console.error(err.message);
        }

    }
    useEffect(() => {
        const userId = localStorage.getItem('user_id')
        const fetchImageData = async (userId) => {
            try {
                const responce = await fetch(`https://netflix-clone-q429.onrender.com/view/getImage?userId=${userId}`, {
                    method: 'GET',
                })
                if (responce.ok) {
                    const dataImage = await responce.json();
                    console.log(dataImage);
                    setImages(dataImage);
                } else {
                    console.error('Image fetch failed. Status:', responce.status);
                }
            } catch (error) {
                console.error('Error during FETCH:', error);
            }
        }
        const fetchData = async () => {
            const body = {
                userId: userId
            }
            try {
                const responce = await fetch('https://netflix-clone-q429.onrender.com/view/views', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                });
                if (responce.ok) {
                    const data = await responce.json()
                    setEmail(data.users_email)
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setPhone(data.phoneNumber);
                    setcountryCode(data.countryCode);
                    setCreated(data.createdOn);
                    setLastLogin(data.lastLogin);
                    setGender(data.gender);
                    // setIsProfileEdited(false);
                } else {
                    console.error('Email Not Found . Status:', responce.status);
                    const errorMessage = await responce.text();
                    console.error('Error message:', errorMessage);
                }
            } catch (error) {
                console.error('Error during FETCH:', error);
            }
        }
        const uploadImage = async () => {
            if (uploadedImage) {
                try {
                    const formData = new FormData();
                    formData.append('file', uploadedImage);
                    formData.append('userId', userId)

                    const response = await fetch('https://netflix-clone-q429.onrender.com/view/updateImage', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        const imageUrl = await response.json();
                        // setImages(imageUrl);
                        console.log("Image: ", imageUrl);
                    } else {
                        console.error('Image upload failed. Status:', response.status);
                    }
                } catch (error) {
                    console.error('Error during image upload:', error);
                } finally {
                    setUploadedImage(null);
                }
            }
        };

        const fetchAddress = async () => {
            const body = { userId: userId };
            const responce = await fetch(`https://netflix-clone-q429.onrender.com/view/viewAddress`, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (responce.ok) {
                const data = await responce.json();
                console.log("Data: ", data)
                setAddress(data.user_street)
                setCities(data.user_city)
                setStates(data.user_state)
                setZipCode(data.user_zipcode)
                setCountry(data.user_country)
                // setAddress
            }

        }
        fetchImageData(userId);
        uploadImage();
        fetchData();
        fetchAddress();
        // updateAddress();
    }, [uploadedImage]);

    useEffect(() => {
        console.log('Address:', address);
        console.log('City:', cities);
        console.log('State:', states);
        console.log('Country:', country);
        console.log('Zip Code:', zipCode);
        console.log('firstName:', firstName);
        console.log('lastName:', lastName);
        // setIsProfileEdited(true);
    }, [address, cities, states, country, zipCode, firstName, lastName]);

    const handleInputClick = (inputId) => {
        setClickedInput((prevInput) => (prevInput === inputId ? null : inputId));
        if (!editMode) {
            setOriginalFirstName(firstName);
            setOriginalLastName(lastName);
            // ... (set original values for other fields as needed)
        }
        setEditMode(true);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleClear = () => {
        // Implement clearing logic for each field here
        if (editMode) {
            setFirstName(originalFirstName);
            setLastName(originalLastName);
            // ... (clear other fields)
        }
        // ... (clear other fields)
        setEditMode(false); // Step 4
    };
    if (loading) {
        return (
            <Loders />
        );
    }
    return (
        <div className='container-xxl profileMain' ref={formRef}>
            {showAlert && <Alert variant='success' className='alertMessage'> Updated Successfully</Alert>}

            <div className='text-white mb-4 headButton'>
                <h1>User Profile</h1>
                {editMode && (
                    <>
                        <Button variant='primary' className='text-light' onClick={updateAddress}>
                            <FontAwesomeIcon
                                icon={faSave}
                                className='mx-1'
                            />
                            SAVE
                        </Button>

                        <Button variant='danger' className='text-light ms-2' onClick={handleClear}>
                            <FontAwesomeIcon icon={faBroom} />
                            Clear
                        </Button>
                    </>
                )}
            </div>
            <Card className='mb-lg-4'>
                <Card.Header as="h5">Basic info</Card.Header>
                <Card.Body>
                    <div className='imageLeft mb-5'>
                        <Card.Img
                            variant='top'
                            // src={viewImages || userDefaultImage}
                            src={viewImages ? `https://netflix-clone-q429.onrender.com/profilImage/${viewImages}` : userDefaultImage}
                            alt='ProfileImage'
                            className='imageStyle'
                            onClick={() => fileInputRef.current.click()}
                            style={{ cursor: 'pointer' }}
                        />
                        <input
                            type='file'
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={(e) => setUploadedImage(e.target.files[0])}
                            ref={fileInputRef}
                        />
                        <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() => fileInputRef.current.click()}
                            style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '7%',
                                transform: 'translateY(-150px)',
                                cursor: 'pointer'
                            }}
                        />
                        <h3 className=' text-capitalize'>
                            {firstName + " " + lastName}
                        </h3>
                        <Button variant="primary" className='buttons ms-5' onClick={handleShowModal} >
                            <FontAwesomeIcon icon={faLock} /> Change Password
                        </Button>
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Change Password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                                <ChangePassword />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <Card.Text>
                        <Form className='nameForm'>
                            <Form.Group className="mb-3 firstNmae" controlId="formBasicFirtName">
                                <Form.Label className='mt-2'>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    style={{
                                        borderBottom: clickedInput === 'firstName' ? '2px solid #007BFF' : '2px solid #000',
                                        backgroundColor: '#F5F5F5',
                                        color: '#000',
                                        borderTop: 'none',
                                        borderLeft: 'none',
                                        borderRight: 'none',
                                        borderRadius: '0',
                                        transition: 'none'
                                    }}
                                    onClick={() => handleInputClick('firstName')}
                                    className='disableHover'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 lastName" controlId="formBasicLastName">
                                <Form.Label className='mt-2'>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    style={{
                                        borderBottom: clickedInput === 'lastName' ? '2px solid #007BFF' : '2px solid #000',
                                        backgroundColor: '#F5F5F5',
                                        color: '#000',
                                        borderTop: 'none',
                                        borderLeft: 'none',
                                        borderRight: 'none',
                                        borderRadius: '0',
                                        transition: 'none'
                                    }}
                                    onClick={() => handleInputClick('lastName')}
                                    className='disableHover'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 lastName" controlId="formBasicLastName">
                                <Form.Label className='mt-2'>Gender</Form.Label>
                                <Form.Control
                                    type="text"
                                    style={{
                                        borderBottom: clickedInput === 'gender' ? '2px solid #007BFF' : '2px solid #000',
                                        backgroundColor: '#F5F5F5',
                                        color: '#000',
                                        borderTop: 'none',
                                        borderLeft: 'none',
                                        borderRight: 'none',
                                        borderRadius: '0',
                                        transition: 'none'
                                    }}
                                    onClick={() => handleInputClick('gender')}
                                    className='disableHover text-capitalize'
                                    value={gender}
                                    disabled
                                    readOnly
                                />
                            </Form.Group>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>

            <div className="detailsCard">
                <Card className=' mb-lg-4 leftCard'>
                    <Card.Header as="h5">Contacts</Card.Header>
                    <Card.Body>
                        <div className='imageLeft mb-5'>
                            <div className='iconStyle d-inline-block'>
                                <FontAwesomeIcon
                                    icon={faAt}
                                    spin style={{ height: '30px', width: '30px' }}
                                    className='mt-2 ms-2  text-center align-content-center'
                                />
                            </div>
                            <h3>{countryCode + "-" + phone}</h3>
                            <p>
                                Email: <span className='fw-bold'>{email}</span>
                            </p>
                        </div>
                        {/* <Card.Title>Special title treatment</Card.Title> */}
                        <Card.Text>
                            <Form className='nameForm'>
                                <Form.Group className="mb-3 firstNmae" controlId="formBasicPhone">
                                    <Form.Label className='mt-2'>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{
                                            borderBottom: clickedInput === 'phone' ? '2px solid #007BFF' : '2px solid #000',
                                            backgroundColor: '#F5F5F5',
                                            color: '#000',
                                            borderTop: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderRadius: '0',
                                            transition: 'none'
                                        }}
                                        onClick={() => handleInputClick('phone')}
                                        className='disableHover'
                                        value={countryCode + '-' + phone}

                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 lastName" controlId="formBasicEmail">
                                    <Form.Label className='mt-2'>Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{
                                            borderBottom: clickedInput === 'email' ? '2px solid #007BFF' : '2px solid #000',
                                            backgroundColor: '#F5F5F5',
                                            color: '#000',
                                            borderTop: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderRadius: '0',
                                            transition: 'none'
                                        }}
                                        onClick={() => handleInputClick('email')}
                                        className='disableHover'
                                        value={email}
                                        disabled
                                    />
                                </Form.Group>
                            </Form>
                            <Form className='nameForm'>
                                <Form.Group className="mb-3 firstNmae" controlId="formBasicPhone">
                                    <Form.Label className='mt-2'>created on</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{
                                            borderBottom: clickedInput === 'created_on' ? '2px solid #007BFF' : '2px solid #000',
                                            backgroundColor: '#F5F5F5',
                                            color: '#000',
                                            borderTop: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderRadius: '0',
                                            transition: 'none'
                                        }}
                                        onClick={() => handleInputClick('created_on')}
                                        className='disableHover'
                                        value={
                                            new Date(created).toLocaleString('en-GB', {
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric',
                                                hour12: true
                                            })
                                        }
                                        disabled
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 firstNmae" controlId="formBasicPhone">
                                    <Form.Label className='mt-2'>Last Login</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{
                                            borderBottom: clickedInput === 'login' ? '2px solid #007BFF' : '2px solid #000',
                                            backgroundColor: '#F5F5F5',
                                            color: '#000',
                                            borderTop: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderRadius: '0',
                                            transition: 'none'
                                        }}
                                        onClick={() => handleInputClick('login')}
                                        className='disableHover'
                                        value={
                                            new Date(lastLogin).toLocaleString('en-GB', {
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric',
                                                hour12: true
                                            })
                                        }
                                        disabled
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>

                <Card className='mb-lg-4 rightCard'>
                    <Card.Header as="h5">Address</Card.Header>
                    <Card.Body>
                        <div className='imageLeft mb-5'>
                            <div className='iconStyle d-inline-block'>
                                <FontAwesomeIcon icon={faMap} beatFade style={{ height: '30px', width: '30px' }} className='mt-2 ms-2  text-center align-content-center' />
                            </div>

                            <h4>{address}</h4>
                            <p>{cities + ' ' + states + ' ' + country + ' ' + zipCode} </p>

                        </div>
                        <Card.Text>
                            <Form className='nameForm'>
                                <Form.Group className="mb-3 firstNmae" controlId="formBasicCountry">
                                    <Form.Label className='mt-2'>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{
                                            borderBottom: clickedInput === 'street' ? '2px solid #007BFF' : '2px solid #000',
                                            backgroundColor: '#F5F5F5',
                                            color: '#000',
                                            borderTop: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderRadius: '0',
                                            transition: 'none'
                                        }}
                                        value={address || ''}
                                        onClick={() => handleInputClick('street')}
                                        className='disableHover'
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 lastName" controlId="formBasicCity">
                                    <Form.Label className='mt-2'>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{
                                            borderBottom: clickedInput === 'city' ? '2px solid #007BFF' : '2px solid #000',
                                            backgroundColor: '#F5F5F5',
                                            color: '#000',
                                            borderTop: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderRadius: '0',
                                            transition: 'none'
                                        }}
                                        value={cities || ''}
                                        onClick={() => handleInputClick('city')}
                                        onChange={(e) => setCities(e.target.value)}
                                        className='disableHover'
                                    />
                                </Form.Group>
                            </Form>
                            <Form className='nameForm'>
                                <Form.Group className="mb-3 lastName" controlId="formBasicCity">
                                    <Form.Label className='mt-2'>State</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{
                                            borderBottom: clickedInput === 'state' ? '2px solid #007BFF' : '2px solid #000',
                                            backgroundColor: '#F5F5F5',
                                            color: '#000',
                                            borderTop: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderRadius: '0',
                                            transition: 'none'
                                        }}
                                        value={states || ''}
                                        onClick={() => handleInputClick('state')}
                                        onChange={(e) => setStates(e.target.value)}
                                        className='disableHover'
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 lastName" controlId="formBasicCity">
                                    <Form.Label className='mt-2'>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{
                                            borderBottom: clickedInput === 'country' ? '2px solid #007BFF' : '2px solid #000',
                                            backgroundColor: '#F5F5F5',
                                            color: '#000',
                                            borderTop: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderRadius: '0',
                                            transition: 'none'
                                        }}
                                        value={country || ''}
                                        onClick={() => handleInputClick('country')}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className='disableHover'
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 lastName" controlId="formBasicCity">
                                    <Form.Label className='mt-2'>Zip Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{
                                            borderBottom: clickedInput === 'zipcode' ? '2px solid #007BFF' : '2px solid #000',
                                            backgroundColor: '#F5F5F5',
                                            color: '#000',
                                            borderTop: 'none',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderRadius: '0',
                                            transition: 'none'
                                        }}
                                        value={zipCode || ''}
                                        onClick={() => handleInputClick('zipcode')}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        className='disableHover'
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            </div>


        </div>
    )
}

export default Profiles

