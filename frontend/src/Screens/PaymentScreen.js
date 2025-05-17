import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    window.location.href = "/shipping";
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    window.location.href = "/placeorder";
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1 className="text-center">Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {/* Add additional payment methods here */}
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Apple Pay"
              id="ApplePay"
              name="paymentMethod"
              value="Apple Pay"
              checked={paymentMethod === "Apple Pay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {/* Add more payment methods as needed */}
          </Col>
        </Form.Group>

        <Row className=" py-3 justify-content-center">
          <Button
            type="submit"
            variant="primary"
            className=" py-3btn btn-block"
          >
            Continue
          </Button>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
