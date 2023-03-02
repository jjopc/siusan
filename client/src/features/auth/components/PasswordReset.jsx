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

import { useDispatch, useSelector } from "react-redux";
import { passwordResetReducer, selectIsLoggedIn } from "../state/authSlice";
import { clearMessage, selectMessage } from "../../../state/messageSlice";
import Layout from "../../../components/ui/Layout";

export default function LogIn() {
  const [isSubmitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const message = useSelector(selectMessage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const initialValues = {
    email: "",
  };

  const passwordResetSchema = Yup.object().shape({
    email: Yup.string().email()
  });

  const handlePost = ({ email }) => {
    dispatch(passwordResetReducer({ email }))
      .unwrap()
      .then(() => {
        setSubmitted(true);
        console.log("Entro por SUCCEED en handlePost en PasswordReset");
        navigate("/");
      })
      .catch((error) => {
        console.log("Entro por ERROR en handlePost en PasswordReset");
        setSubmitted(false);
      });
  };

  return (
    <Layout>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="/#/login">Login</Breadcrumb.Item>
        <Breadcrumb.Item active>Reset Password</Breadcrumb.Item>
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
                  src={"change-password-icon.svg"}
                  alt="Icono de cambiar contraseña"
                  width={40}
                  height={40}
                  className="me-3"
                />
                <h1 className="mb-0">¿Has olvidado tu contraseña?</h1>
                <p>No te preocupes, te enviaremos las intrucciones a seguir.</p>
              </Container>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValues}
                validationSchema={passwordResetSchema}
                onSubmit={handlePost}
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
                    {message && <Alert variant="danger">{message}</Alert>}
                    <Form noValidate>
                      <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Correo electrónico:</Form.Label>
                        <Form.Control
                          className={
                            touched.email && errors.email
                              ? "is-invalid"
                              : ""
                          }
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          required
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>
                      <div className="d-grid mb-3">
                        <Button
                          disabled={isSubmitted}
                          type="submit"
                          variant="primary"
                          onClick={handleSubmit}
                        >
                          Recuperar contraseña
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </Formik>
              <Card.Text className="text-center">
                Volver a{" "}
                <Link to="/login">Login</Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
