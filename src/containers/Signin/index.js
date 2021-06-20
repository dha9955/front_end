import React, {useState } from "react";
import { Redirect } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Header from "../../components/Header";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions";

/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user);

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(signin(user));
  };

  if (userToken.authenticate) {
    return <Redirect to={`/`} />;
  }

  return (
    <div>
    <Header/>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 style={{ marginTop: "20px", marginLeft: "30%" }}>
              SIGN IN HERE
            </h2>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Your Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                placeholder="Your Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
