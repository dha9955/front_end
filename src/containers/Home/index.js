/* eslint-disable */

import React, { useState } from "react";
import Header from "../../components/Header";
import { Row, Container, Table, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../../actions";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import "./style.css";
import axios from "axios";
import { apibase } from "../../APIs/baseApi";
import { contactConstants } from "../../actions/constants";

import moment from "moment";

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

  let [ choosedOBJ , setChoosedOBJ ] = useState({

  })

  const dispatch = useDispatch();
  const contact = useSelector((state) => state.contact);

  const handleClose = () => setShow(false)

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
            <th>

              <input type="checkbox" 
              checked={ Object.keys(choosedOBJ).length === contact.contacts.length } 
              onChange={e => {

                let o = {}

                contact.contacts.map(x => {
                  o[x._id] = true
                  return 
                })

                if( Object.keys(choosedOBJ).length < Object.keys(o).length ) {
                  choosedOBJ = o
                } else {
                  choosedOBJ = {}
                }

                setChoosedOBJ({...choosedOBJ})

              }} />

            </th>
            <th>#</th>
            <th>Name</th>
            <th>Direct Manager</th>
            <th>Start Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contact.contacts.length > 0
            ? contact.contacts.map((contact, i) => (
                <tr key={contact._id}>
                  <td>
                    <input
                      type="checkbox" 
                      checked={choosedOBJ[contact._id]}
                      onChange={(e) => {
                        if( choosedOBJ[contact._id] ) {
                          delete choosedOBJ[contact._id]
                        } else {
                          choosedOBJ[contact._id] = true
                        }
                        setChoosedOBJ({...choosedOBJ})
                      }}
                    />
                  </td>
                  <td>{i + 1}</td>
                  <td>
                    {contact.firstName} {contact.middleName} {contact.lastName}
                  </td>
                  <td>{contact.directManageId}</td>
                  <td>{moment(contact.startDate).format("DD/MM/yyyy")}</td>
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
            <p className="value">{moment(contactDetails.DOB).format('DD/MM/yyyy')}</p>
          </Col>
          <Col md="6">
            <label className="key">Gender</label>
            <p className="value">{contactDetails.gender}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Start Date</label>
            <p className="value">{moment(contactDetails.startDate).format('DD/MM/yyyy')}</p>
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

            <div style={{ display: "flex" }}>
              <Button variant="dark">Add Contact</Button>

              <input
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                placeholder="Middle name"
                onChange={(e) => setMiddleName(e.target.value)}
              />
              <input
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
              />

              <Button
                onClick={(e) => {
                  let obj = {
                    fName: firstName !== "" ? firstName : undefined,
                    mName: middleName !== "" ? middleName : undefined,
                    lName: lastName !== "" ? lastName : undefined,
                  };
                  axios
                    .post(apibase.localHost + "/api/contact/search", obj)
                    .then((res) => {
                      let data = res.data.data;
                      dispatch({
                        type: contactConstants.GET_ALL_CONTACTS_SUCCESS,
                        payload: {
                          contacts: data,
                        },
                      });
                    });
                }}
              >
                <i></i>
              </Button>

              <button disabled={ Object.keys(choosedOBJ).length === 0 } onClick={ e => {
                console.log(Object.keys(choosedOBJ))

              }}>Xoá</button>
            </div>
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
