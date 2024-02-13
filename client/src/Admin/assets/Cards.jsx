import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row } from 'react-bootstrap';

const Cards = ({ header, icons, title, desc }) => {
    return (
        <Row xs={1} md={1}>
            <Col>
                <Card className='text-black bg-info'>

                    <Card.Header as={'h4'} className='flex flex-row'>
                        {header}
                        <FontAwesomeIcon className='ms-lg-5' icon={icons} />
                    </Card.Header>

                    <Card.Body>
                        <Card.Title as={'h1'}>{title}</Card.Title>
                        <Card.Title as={'h5'}>{desc}</Card.Title>

                    </Card.Body>
                </Card>
            </Col>

        </Row>
    )
}

export default Cards
