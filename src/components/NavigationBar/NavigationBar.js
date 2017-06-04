import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './../../actions/auth';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class NavigationBar extends React.Component {

  logout(e) {
    e.preventDefault();
    this.props.logout();
    browserHistory.push('/login');
  }

  render() {

    const {isAuthenticated} = this.props.auth;

    const guestLinks = (
      <Nav pullRight>
        <NavItem><Link to="/login">Login</Link></NavItem>
        <NavItem><Link to="/signup">Signup</Link></NavItem>
      </Nav>
    );

    const userLinks = (
      <Nav pullRight>
        <NavDropdown title="Dropdown title" id="NavDropdown">
          <MenuItem><Link to="/account">Account</Link></MenuItem>
          <MenuItem divider/>
          <MenuItem onClick={this.logout.bind(this)}>
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
          {!isAuthenticated ? userLinks : guestLinks}
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

export default connect(mapStateToProps, {logout})(NavigationBar);