import React, { useState } from 'react'; // Removed useEffect import
import { Link, Navigate, redirect } from 'react-router-dom'; // Changed Redirect to Navigate
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location }) => {
    const [name,setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message,setMessage] = useState(null);


  const redirectPath = location?.search ? location.search.split('=')[1] : '/';
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if(password!== confirmPassword){
        setMessage('Passwords do not match')
    }else{
        dispatch(register(name,email,password))
    }
  };

  // Redirect if user info is available
  if (userInfo) {
    return <Navigate to={redirectPath} />; // Changed Redirect to Navigate
  }

  return (
    <FormContainer>
      <h1 className='text-center'>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Row className='py-2'></Row>
        <Row className="justify-content-center"> 
            <Button type="submit" variant="primary" className="btn btn-block">
              Register
            </Button>
        </Row>
      </Form>
      <Row className="py-3">
        <Col className="text-center"> {/* Centering the text */}
          Existing Customer?{' '}
          <Link to={redirect ?`/login?redirect=${redirectPath}`:'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
  
};

export default RegisterScreen;
