import React from 'react'
import { Card } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './feature.scss';
import rightSideImage from '../assets/userImage/mobile-0819.jpg';
import boxshot from '../assets/userImage/boxshot.png'


const FeatureOne = () => {
    // const [showArrow, setShowArrow] = useState(false);
    // useEffect(() => {
    //     const circle = document.querySelector('.custom-animatedd');
    //     const arrow = document.querySelector('.download-arrow');
    //     console.log(circle);

    //     const handleTransitionEnd = () => {
    //         setTimeout(() => {
    //             setShowArrow(true);
    //         }, 2000);

    //     }
    //     circle.addEventListener('animationiteration', handleTransitionEnd);
    //     arrow.addEventListener('transitionend', handleTransitionEnd);

    //     // circle.addEventListener('animationend', handleAnimationEnd);
    //     console.log(circle.addEventListener('animationiteration', handleTransitionEnd));

    //     console.log(showArrow);
    //     return () => {
    //         // circle.removeEventListener('animationend', handleAnimationEnd);
    //         circle.removeEventListener('animationiteration', handleTransitionEnd);
    //         arrow.removeEventListener('transitionend', handleTransitionEnd);

    //     };

    // }, []);

    return (
        <div className='features'>
            <hr />
            <div className='container text-white'>
                <div className='leftSide1'>
                    <img src={rightSideImage} alt='mobile-0819' style={{ width: '140%' }} />
                    <Card className='marginCard bg-black border text-white flex-column' style={{ '--bs-card-height': '12vh' }}>
                        <Card.Img variant="top" src={boxshot} style={{ height: '90px', width: '80px', padding: '10px' }} className=' flex-column' />
                        <Card.Body style={{ marginLeft: '11vh', marginTop: '-10.5vh' }}>
                            <Card.Title className=' flex-column'>Stranger Things</Card.Title>
                            <Card.Text style={{ color: 'blue' }} >Downloading...</Card.Text>
                            <Card.Text className={`text-primary icon custom-animatedd `}>
                                {/* <div className={`download-arrow ${showArrow ? 'show' : 'custom-animatedd'} `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                                </div> */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <div className='rightSide1 position-relative'>
                    <h1>Download your shows to watch offline</h1>
                    <p>Save your favourites easily and always have something to watch.</p>
                </div>
            </div>

        </div>
    )
}

export default FeatureOne
