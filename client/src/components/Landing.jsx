import React from "react";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Landing() {
  return (
    <Container>
      <Row xs="auto" className="align-content-center justify-content-center">
        <Col>
          <Card className="shadow mt-3">
            <Card.Body>
              <Container
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={"/cms-logo.svg"}
                  alt="Logo de SIUSAN"
                  width={45}
                  height={45}
                  className="me-4"
                />
                <div>
                  <h1>SIUSAN</h1>
                </div>
              </Container>
              <div className="d-grid mt-2">
                <LinkContainer to="/login">
                  <Button data-cy="logIn">Log in</Button>
                </LinkContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
