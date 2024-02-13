import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './moviesCards.scss'

const MoviesCards = ({ image, title, descr }) => {
    return (
        <div className='moviesLists'>
            <Card className='movieCard' style={{ width: '18rem' }}>
                <div className='hoverContent'>
                    <div className='textContainer mt-2'>
                        <Card.Title className=' mb-auto'>{title}</Card.Title>
                        {/* <Card.Text>{descr}</Card.Text> */}
                        <Button variant='primary' className=' ms-auto mb-auto' >Watch</Button>
                    </div>
                </div>
                <div className='hoverableImage'>
                    <Card.Img variant='top' src={image} className=' mb-2' />
                </div>
            </Card>
        </div>
    )
}

export default MoviesCards
