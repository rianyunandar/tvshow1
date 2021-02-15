import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/logo.png"
            width="45"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto centerText">
            <LinkContainer to="/movie">
              <Nav.Link>
              <i class="fas fa-home"></i> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/onshow">
              <Nav.Link>
              <i class="fas fa-tv"></i> On Show Today
              </Nav.Link>
            </LinkContainer>
            <Nav.Link>
              <i className="fas fa-user"></i> Log in
            </Nav.Link>
            <Nav.Link>
              <i className="fas fa-user"></i> Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
