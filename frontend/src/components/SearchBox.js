import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      window.location.href = `/search/${keyword}`;
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Row className="align-items-center">
        <Col>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search..."
          ></Form.Control>
        </Col>
        <Col>
          <Button type="submit" variant="outline-success" className="p-2">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
