import React, { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Define navigate function

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));

        // Redirect to the next screen after form submission
        navigate('/payment'); // Use navigate function to navigate to /payment
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />

            <h1 className='text-center'>Shipping Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='py-1'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='py-1' controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter City'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='py-1' controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className='py-1' controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Row className='py-2'></Row>
                <Row className="justify-content-center">
                    <Button type='submit' variant='primary' className='btn btn-block'>
                        Continue
                    </Button>
                </Row>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;
