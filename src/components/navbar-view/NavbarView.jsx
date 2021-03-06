import React from 'react';
import { Col, Container, Navbar, Nav } from 'react-bootstrap';
import Logo from '../../logo/logo.png';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

export default function NavbarView({ onLoggedOut }) {
  return (
    <Navbar className="navbar"
      collapseOnSelect
      expand="lg"
      variant="dark"
      sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={Logo}
            height="100"
            className="d-inline-block align-top"
          />{''}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav-link">
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="#">Features</Nav.Link>
            <Nav.Link href="#">Pricing</Nav.Link>
            <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

