import React, { useState } from "react"; // Removed useEffect import
import { Link, Navigate } from "react-router-dom"; // Changed Redirect to Navigate
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectPath = location?.search ? location.search.split("=")[1] : "/";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Redirect if user info is available
  if (userInfo) {
    return <Navigate to={redirectPath} />; // Changed Redirect to Navigate
  }

  return (
    <FormContainer>
      <h1 className="text-center">Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        <Row className="py-2"></Row>
        <Row className="justify-content-center">
          {" "}
          {/* Centering the button */}
          <Button type="submit" variant="primary" className="btn btn-block">
            {" "}
            {/* Adding btn-lg class for bigger size and btn-block to make it full-width */}
            Sign In
          </Button>
        </Row>
      </Form>
      <Row className="py-3">
        <Col className="text-center">
          {" "}
          {/* Centering the text */}
          New Customer?{" "}
          <Link to={`/register?redirect=${redirectPath}`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
