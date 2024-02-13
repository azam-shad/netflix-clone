import React from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './home.scss';
import Feature from '../Feature/Feature';
import FeatureOne from '../Feature/FeatureOne';
import { Link } from 'react-router-dom';



const Home = () => {


    return (
        <>
            {/* <Headers /> */}
            <div className='text-white container-xx home'>
                <h1 className='mb-4'>Unlimited movies, TV shows and more</h1>
                <h6 className=' text-lg-center mb-4'>Watch anywhere. Cancel anytime.</h6>
                <h6 className=' text-lg-center mb-4'>Ready to watch? Enter your email to create or restart your membership.</h6>
                <div className={`mb-5 inputField`} >
                    {/* <FloatingLabel
                        // controlId="floatingInput"
                        label="Email address"
                        className='custom-floating-label'
                        style={{ backgroundColor: 'red !important' }}

                    >
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            className='formControl'

                        />
                    </FloatingLabel> */}
                    <Button
                        className='button bg-danger border-0'>
                        <Link className='text-decoration-none text-white' to={'/register'} > Get Started<FontAwesomeIcon icon={faChevronRight} className='ms-2 mt-2' /></Link>

                    </Button>
                </div>
            </div>
            <Feature />
            <FeatureOne />
        </>
    )
}

export default Home
