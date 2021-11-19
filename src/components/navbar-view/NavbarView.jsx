import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Logo from '../../logo/logo.png';

export default function NavbarView({ onLoggedOut }) {
  return (
      <Navbar className="navbar"
        collapseOnSelect
        expand="lg"
        variant="dark"
        sticky="top">
        <Container>
          <Navbar.Brand href="#home">
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
              <Nav.Link href="#home" >Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

