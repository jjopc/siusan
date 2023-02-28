import React from "react";
import { Button, Navbar, Form, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Header() {
  return (
    <header>
      <Navbar
        collapseOnSelect
        bg="primary"
        variant="dark"
        expand="sm"
        className="px-3"
      >
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              alt="Logo de SIUSAN"
              src={"/cms-logo.svg"}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            SIUSAN
          </Navbar.Brand>
        </LinkContainer>
        {/* <LinkContainer to="/">{username}</LinkContainer> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <LinkContainer to="/patients">
              <Nav.Link>Pacientes</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Configuración">
              <LinkContainer to="/">
                <NavDropdown.Item>Cambiar contraseña</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/">
                <NavDropdown.Item>Link</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/">
                <NavDropdown.Item>Link</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
          <Form>
            <Button data-cy="logOut" type="button">
              Log out
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
