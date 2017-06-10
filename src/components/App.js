import React from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import { Grid, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css'

class App extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <NavigationBar />
        </Row>
        <Row>
          <Col xs={12}>{ this.props.children }</Col>
        </Row>
      </Grid>
    );
  }
}

export default App;