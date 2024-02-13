import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Alert, Button } from 'react-bootstrap';

const View = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [messages, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/adminData/viewDetails/${userId}`);
        const data = await response.json();
        setUserData(data.userView);
        setAddressData(data.addressView);
        setIsDisabled(data.userView.status === 'disable')
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const updateUserStatus = async (status) => {
    try {
      const response = await fetch(`http://localhost:5000/adminData/updateStatus/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (data.message === 'Status Updated Successfully') {
        setIsDisabled(status === 'disable');
        setMessage(`${status.charAt(0).toUpperCase() + status.slice(1)} Successful`);
        setTimeout(() => setMessage(''), 3000);
      } else if (data.message === 'Status Updation Failed') {
        setMessage('Status Updation Failed');
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }



  console.log('USer Data: ', isDisabled)

  return (
    <>
      <div className="datatable">
        {messages && <Alert variant='danger' className='alertMessage mt-5' >{messages}</Alert>}
        {userData ? (
          <>
            <h2 className='mb-3 mt-2'>User Details</h2>
            <Form className='d-inline-block'>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
                <Form.Control
                  placeholder="First Name"
                  aria-label="First Name"
                  aria-describedby="basic-addon1"
                  value={userData.firstname}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
                <Form.Control
                  placeholder="Last Name"
                  aria-label="Last Name"
                  aria-describedby="basic-addon1"
                  value={userData.lastname}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                <Form.Control
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                  value={userData.email}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Mobile Number</InputGroup.Text>
                <Form.Control
                  placeholder="Mobile Number"
                  aria-label="Mobile Number"
                  aria-describedby="basic-addon1"
                  value={userData.countrycode + ' ' + userData.phonenumber}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Gender</InputGroup.Text>
                <Form.Control
                  placeholder="Gender"
                  aria-label="Gender"
                  aria-describedby="basic-addon1"
                  value={userData.gender}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Street</InputGroup.Text>
                <Form.Control
                  placeholder="Address"
                  aria-label="Address"
                  aria-describedby="basic-addon1"
                  value={addressData.street}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">City</InputGroup.Text>
                <Form.Control
                  placeholder="City"
                  aria-label="City"
                  aria-describedby="basic-addon1"
                  value={addressData.city}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">State</InputGroup.Text>
                <Form.Control
                  placeholder="State"
                  aria-label="State"
                  aria-describedby="basic-addon1"
                  value={addressData.state}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Country</InputGroup.Text>
                <Form.Control
                  placeholder="Country"
                  aria-label="Country"
                  aria-describedby="basic-addon1"
                  value={addressData.country}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Zip Code</InputGroup.Text>
                <Form.Control
                  placeholder="Zip Code"
                  aria-label="Zip Code"
                  aria-describedby="basic-addon1"
                  value={addressData.zip_code}
                />
              </InputGroup>
              <Button variant={isDisabled ? 'success' : 'danger'} onClick={() => updateUserStatus(isDisabled ? 'enable' : 'disable')}>
                {isDisabled ? 'Enable' : 'Disable'}
              </Button>
            </Form>
          </>


        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default View;

