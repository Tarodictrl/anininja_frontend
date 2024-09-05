import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Search = () => {
    return (
        <Container d="flex" flex="wrap" text="white">
            <Form className='text-white' action="/anime/search" method="GET">
                <Row>
                    <Col>
                        <Form.Control name='name' size="lg" type="text" placeholder="Введите название аниме..." />
                    </Col>
                    <Col sm="auto">
                        <Button size="lg" type='submit'>Нажми</Button>
                    </Col>
                </Row>
            </Form>
        </Container> 
      );
};

export default Search;