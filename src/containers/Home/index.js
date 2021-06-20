import React, { useState } from "react";
import Header from "../../components/Header";
import { Row, Container, Table, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../../actions";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import "./style.css";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [directManageId, setDirectManageId] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [startDate, setStartDate] = useState("");
  const [show, setShow] = useState("");
  const [contactDetailModal, setContactDetailModal] = useState(false);
  const [contactDetails, setContactDetails] = useState(null);

  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact);

  const handleClose = () => {
    setShow(false);
  };

  const submitContactFomr = () => {
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("middleName", middleName);
    form.append("lastName", lastName);
    form.append("directManageId", directManageId);
    form.append("DOB", DOB);
    form.append("gender", gender);
    form.append("startDate", startDate);

    dispatch(addContact(form).then(() => setShow(false)));
  };

  const handleShow = () => setShow(true);

  const renderContacts = () => {
    return (
      <Table
        style={{ fontSize: 15, marginTop: "20px" }}
        responsive="sm"
        className="table table-hover"
      >
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
            ? contact.contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>2</td>
                  <td>
                    {contact.firstName} {contact.middleName} {contact.lastName}
                  </td>
                  <td>{contact.directManageId}</td>
                  <td>{contact.startDate}</td>
                  <td>
                    <button onClick={() => showContactDetailsModal(contact)}>
                      info
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddContactModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Contact"}
        onSubmit={submitContactFomr}
      >
        <Input
          label="First Name"
          value={firstName}
          placeholder={`First Name`}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="Middle Name"
          value={middleName}
          placeholder={`Middle Name`}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <Input
          label="Last Name"
          value={lastName}
          placeholder={`last Name`}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Modal>
    );
  };

  const handleCloseContactDetailsModal = () => {
    setContactDetailModal(false);
  };

  const showContactDetailsModal = (contact) => {
    setContactDetails(contact);
    setContactDetailModal(true);
  };

  const renderContactDetailsModal = () => {
    if (!contactDetails) {
      return null;
    }
    return (
      <Modal
        show={contactDetailModal}
        handleClose={handleCloseContactDetailsModal}
        modalTitle={"Contact Details"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">First Name</label>
            <p className="value">{contactDetails.firstName}</p>
          </Col>
          <Col md="6">
            <label className="key">Middle Name</label>
            <p className="value">{contactDetails.middleName}</p>
          </Col>
          <Col md="6">
            <label className="key">Last Name</label>
            <p className="value">{contactDetails.lastName}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Direct Manager</label>
            <p className="value">{contactDetails.directManageId}</p>
          </Col>
          <Col md="6">
            <label className="key">Date of Birth</label>
            <p className="value">{contactDetails.DOB}</p>
          </Col>
          <Col md="6">
            <label className="key">Gender</label>
            <p className="value">{contactDetails.gender}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Start Date</label>
            <p className="value">{contactDetails.startDate}</p>
          </Col>
        </Row>
      </Modal>
    );
  };

  return (
    <div>
      <Header />
      <Container>
        <Row style={{ marginTop: "100px" }}>
          <Col>
            <h2 style={{ marginLeft: "30%" }}>Contact Management System</h2>
            <Button variant="dark" onClick={handleShow}>
              Add Contact
            </Button>
            {renderContacts()}
          </Col>
        </Row>
      </Container>
      {renderAddContactModal()}
      {renderContactDetailsModal()}
    </div>
  );
};

export default Home;
