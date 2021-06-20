import React, {useState, useEffect } from "react";
import Header from "../../components/Header";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions";
import { Redirect } from "react-router-dom";

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.loading) {
      setEmail("");
      setPassword("");
    }
  }, [user.loading]);

  const userSignup = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(signup(user));
  };

  if (user.authenticate) {
    return <Redirect to={`/`} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }

  return (
    <div>
      <Header/>
      <Container>
        {user.message}
        <Row style={{ marginTop: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 style={{ marginTop: "20px", marginLeft: "16%" }}>
              CREATE YOUR ACCOUNT
            </h2>
            <Form onSubmit={userSignup}>
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

export default Signup;
