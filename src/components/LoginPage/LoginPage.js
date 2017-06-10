import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Form from './Form';

class Login extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <Form/>
        </Col>
      </Row>
    );
  }
}

export default Login;