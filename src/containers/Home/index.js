/* eslint-disable */


import React, { useState } from "react";
import Header from "../../components/Header";
import { Row, Container, Table, Col, Button  } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import axios from "axios";
import { apibase } from "../../APIs/baseApi";
import { contactConstants } from "../../actions/constants";

import moment from 'moment'

/**
 * @author
 * @function Home
 **/

const Home = (_props) => {

  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [directManageId, setDirectManageId] = useState("")
  const [DOB, setDOB] = useState("")
  const [gender, setGender] = useState("")
  const [startDate, setStartDate] = useState("")
  const [show ,setShow] = useState("")
  const [contactDetailModal, setContactDetailModal] = useState(false)
  const [contactDetails, setContactDetails] = useState(null)

  const dispatch = useDispatch()
  const contact = useSelector( (state) => state.contact )

  const handleClose = () => setShow(false)

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
          ? contact.contacts.map((contact , i) => (
            <tr key = {contact._id}>
              <td>{i+1}</td>
              <td>{contact.firstName} {contact.middleName} {contact.lastName}</td>
              <td>{contact.directManageId}</td>
              <td>{moment(contact.startDate).format('DD/MM/yyyy')}</td>
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

            <div style={{ display : 'flex' }}>

              <Button variant="dark">Add Contact</Button>

              <input placeholder='First name' onChange={e => setFirstName(e.target.value)} />
              <input placeholder='Middle name' onChange={e => setMiddleName(e.target.value)} />
              <input placeholder='Last name' onChange={e => setLastName(e.target.value)} />

              <Button onClick={e => {

                let obj = {
                  fName : firstName !== '' ? firstName : undefined , 
                  mName : middleName !== '' ? middleName : undefined , 
                  lName : lastName !== '' ? lastName : undefined
                }
                axios.post( apibase.localHost+'/api/contact/search' , obj )
                .then(res => {
                  let data = res.data.data
                  dispatch({
                    type : contactConstants.GET_ALL_CONTACTS_SUCCESS ,
                    payload : {
                      contacts : data
                    }
                  })
                })
              }}>
                <i>

                </i>
              </Button>

            </div>
            {renderContacts()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
