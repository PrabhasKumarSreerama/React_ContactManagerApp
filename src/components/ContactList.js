import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import api from "../api/contacts";

const ContactList = (props) => {
  // const [contacts, setContacts] = useState([])
  const inputEl = useRef("");

  const retriveContacts = async () => {
    const response = await api.get("/contacts")
    return response.data
  }

  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  useEffect(() => {
   
  }, []);

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList}</div>
      {/* <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts available"}
      </div> */}
    </div>
  );
};

export default ContactList;
