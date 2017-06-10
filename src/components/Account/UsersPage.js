import React from 'react';
import * as api from 'utils/api';
import _ from 'lodash';
import moment from 'moment';
import { Row, Col, Table } from 'react-bootstrap';

class UsersPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      'list': []
    }
  }

  async componentDidMount() {
    const users = await api.getUsers()
    this.setState({ list: users.list })
  }

  render() {
    const { list } = this.state

    return (
      <Row>
        <Col xs={12}>
          <Table striped bordered condensed hover>
            <thead>
            <tr>
              <td>id</td>
              <td>email</td>
              <td>last login</td>
            </tr>
            </thead>
            <tbody>
            {_.map(list, user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{moment(user.lastLogin).format('L LT')}</td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default UsersPage;