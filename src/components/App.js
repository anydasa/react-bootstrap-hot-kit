import React from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import { Grid, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends React.Component {

  render() {
    return (
      <Grid>
        <Row>
          <NavigationBar />
        </Row>
        { this.props.children }
      </Grid>
    );
  }
}

export default App;