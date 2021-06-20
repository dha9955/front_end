import React, { useState } from "react";
import Header from "../../components/Header";
import { Row, Container, Table, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {

  const [firstName, setFirstName] = useState("")
  const [middeName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [directManageId, setDirectManageId] = useState("")
  const [DOB, setDOB] = useState("")
  const [gender, setGender] = useState("")
  const [startDate, setStartDate] = useState("")
  const [show ,setShow] = useState("")
  const [contactDetailModal, setContactDetailModal] = useState(false)
  const [contactDetails, setContactDetails] = useState(null)

  const dispatch = useDispatch()
  const contact = useSelector((state)=>state.contact)

  const handleClose = () => {
    setShow(false)
  }

  const renderContacts = () => {
    return (
      <Table style={{ fontSize: 15, marginTop: "20px" }} responsive="sm" className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Direct Manager</th>
            <th>Start Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contact.contacts.length > 0
          ? contact.contacts.map((contact)=>(
            <tr key = {contact._id}>
              <td>2</td>
              <td>{contact.firstName} {contact.middleName} {contact.lastName}</td>
              <td>{contact.directManageId}</td>
              <td>{contact.startDate}</td>
              <td></td>
            </tr>
          ))
          : null}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <Header />
      <Container>
        <Row style={{ marginTop: "100px" }}>
          <Col>
          <h2 style={{marginLeft:"30%"}}>Contact Management System</h2>
          <Button variant="dark">Add Contact</Button>
          {renderContacts()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
