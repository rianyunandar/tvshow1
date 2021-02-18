import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user } = useAuth0();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Navbar.Brand>
          <LinkContainer to="/">
            <img
              alt=""
              src="/logo.png"
              width="45"
              height="30"
              className="d-inline-block align-top"
            />
          </LinkContainer>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto centerText">
          {isAuthenticated ? <Nav.Link>
              Welcome  {user.name}
            </Nav.Link> :<i></i>}
            <LinkContainer to="/">
              <Nav.Link>
                <i className="fas fa-home"></i> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/shows">
              <Nav.Link>
                <i className="fas fa-tv"></i> Shows
              </Nav.Link>
            </LinkContainer>
            {isAuthenticated ?
            
            <Nav.Link
              onClick={() =>
                logout({
                  returnTo: window.location.origin
                })
              }
            >
              <i className="fas fa-user"></i> Log Out
            </Nav.Link>:
            <Nav.Link onClick={() => loginWithRedirect()}>
            <i className="fas fa-user"></i> Log in
          </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
