import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export const CustomNavBar = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12" style={{ paddingRight: "0px" }}>
          <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="#home">Opening Explorer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="https://github.com/aaronb97/OpeningExplorer">
                  GitHub
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br />
        </div>
      </div>
    </div>
  );
};
