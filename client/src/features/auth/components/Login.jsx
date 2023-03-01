import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Card,
  Button,
  Form,
  Container,
  Alert,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

// import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/ui/Layout";

export default function LogIn() {
  const [isSubmitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const logInSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "¡Nombre de usuario demasiado corto!")
      .max(150, "¡Nombre de usuario demasiado largo!")
      .required("Campo obligatorio"),
    password: Yup.string()
      .min(8, "¡Contraseña demasiado corta!")
      .max(50, "¡Contraseña demasiado larga!")
      .required("Campo obligatorio"),
  });

  const handleLogin = ({ username, password }) => {
    console.log(username, password);
  };

  return (
    <Layout>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Log in</Breadcrumb.Item>
      </Breadcrumb>
      <Row xs="auto" className="align-content-center justify-content-center">
        <Col>
          <Card className="shadow">
            <Card.Header>
              <Container
                fluid
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={"cms-logo.svg"}
                  alt="Logo de SIUSAN"
                  width={40}
                  height={40}
                  className="me-3"
                />
                <h1>SIUSAN</h1>
              </Container>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValues}
                validationSchema={logInSchema}
                onSubmit={handleLogin}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  isSubmitting,
                  values,
                }) => (
                  <>
                    {/* {message && <Alert variant="danger">{message}</Alert>} */}
                    <Form noValidate>
                      <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Nombre de usuario:</Form.Label>
                        <Form.Control
                          className={
                            touched.username && errors.username
                              ? "is-invalid"
                              : ""
                          }
                          name="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          required
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Contraseña:</Form.Label>
                        <InputGroup>
                          <Form.Control
                            className={
                              touched.password && errors.password
                                ? "is-invalid"
                                : ""
                            }
                            name="password"
                            type={showPassword ? "text" : "password"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            required
                          />
                          <Button
                            variant="outline-secondary"
                            id="btnShowPassword"
                            className="input-group-append"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? "Ocultar" : "Mostrar"}
                          </Button>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </InputGroup>
                      </Form.Group>
                      <div className="d-grid mb-3">
                        <Button
                          disabled={isSubmitted}
                          type="submit"
                          variant="primary"
                          onClick={handleSubmit}
                        >
                          Log in
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
              <Card.Text className="text-center">
                ¿Has olvidado tu contraseña?{" "}
                <Link to="/password-reset">¡Recupérala!</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
