import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row } from 'react-bootstrap';


const Cards = ({ header, icons, title, desc, release_date, genres, average_rating, movie_title }) => {

    return (
        <Row xs={1} md={1} className=' mb-1'>
            <Col>
                <Card className={`text-black bg-info`} >

                    <Card.Header as={'h5'} className='flex flex-row'>

                        <FontAwesomeIcon style={{ marginRight: '10px' }} icon={icons} />
                        {header}
                    </Card.Header>

                    <Card.Body>
                        <Card.Title as={'h1'}>{title}</Card.Title>
                        <Card.Title as={'h5'}>{movie_title}</Card.Title>
                        <Card.Title as={'p'}>{release_date}</Card.Title>
                        <Card.Title as={'p'}>{genres}</Card.Title>
                        <Card.Title as={'p'}>{average_rating}</Card.Title>
                        <Card.Title as={'h5'}>{desc}</Card.Title>

                    </Card.Body>
                </Card>
            </Col>

        </Row>
    )
}

export default Cards

