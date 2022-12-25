import React from 'react'
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const DeleteContact = (props) => {
  // const { name, email } = props.location.state.contact;
  return (
    <div className="main">
      <h2>
        DeleteContact
      </h2>
      <div className="content">
        <h3>Are you sure to delete this contact?</h3>
        <Link to="/" > 
          <button className='ui button blue right'> 
            yes 
          </button>
        </Link>
        <button className='ui button red right'> no </button>      
      </div>
    </div>
  )
}

export default DeleteContact