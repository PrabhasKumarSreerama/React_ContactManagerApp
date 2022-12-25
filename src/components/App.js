import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {v4} from 'uuid';
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";

function App() {
  const [contacts, setContacts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const retriveContacts = async () => {
    const response = await api.get("/contacts")
    return response.data
  }

  const addContactHandler = async (contact) => {
    console.log(contact)
    const request = {
      id: v4(),
      ...contact
    }
    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data])
  }

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact)
    const {id, name, email} = response.data
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data} : contact
      })
    )
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id
    })
    setContacts(newContactList)
  }
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  useEffect(() => {
    //const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (localStorage.getItem("contacts")) {
    //   setContacts(JSON.parse(localStorage.getItem("contacts")))
    // }
    console.log("update happened");
    const getAllContacts = async () => {
      const allContacts = await retriveContacts()
      if(allContacts) setContacts(allContacts) 
    }
    getAllContacts()
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route 
            exact
            path="/" 
            render={(props) => (
              <ContactList 
                {...props}
                contacts={contacts} 
                getContactId={removeContactHandler} 
                term={searchTerm}
                searchKeyword = {searchHandler}
              />
            )} 
          />
          <Route 
            path="/add" 
            render={(props) => (
              <AddContact 
                {...props} 
                addContactHandler={addContactHandler} 
              />
            )} 
          />
          <Route 
            path="/edit" 
            render={(props) => (
              <EditContact 
                {...props} 
                updateContactHandler={updateContactHandler} 
              />
            )} 
          />
          <Route 
            path="/delete" 
            render={(props) => (
              <DeleteContact
                {...props} 
                getContactId={removeContactHandler} 
              />
            )} 
          />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
