import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './../../actions/auth';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

class NavigationBar extends React.Component {

  onLogout() {
    this.props.logout();
    browserHistory.push('/login');
  }

  render() {

    const {isAuthenticated} = this.props.auth;

    const guestLinks = (
      <Nav pullRight>
        <LinkContainer to="/login" active={false}><NavItem>Login</NavItem></LinkContainer>
        <LinkContainer to="/signup"><NavItem>Signup</NavItem></LinkContainer>
      </Nav>
    );

    const userLinks = (
      <Nav pullRight>
        <NavDropdown title="Menu" id="NavDropdown">
          <LinkContainer to="/account"><MenuItem>Account</MenuItem></LinkContainer>
          <LinkContainer to="/account/users"><MenuItem>Users</MenuItem></LinkContainer>
          <MenuItem divider/>
          <MenuItem onClick={this.onLogout.bind(this)}>
            <i className="fa fa-fw fa-power-off"/> Log out
          </MenuItem>
        </NavDropdown>
      </Nav>
    );

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Brand name</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {isAuthenticated ? userLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout })(NavigationBar);