import './customNavBar.scss';

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
    <Navbar.Brand as={Link} to="/">
      Opening Explorer
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/about">
          About
        </Nav.Link>
        <Nav.Link href="https://github.com/aaronb97/OpeningExplorer">
          GitHub
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default CustomNavBar;
