import React from 'react';


function ViewContact ({contact, onClose}) {
    // console.log(contact);
    return(
        <div className='modal'>
            <p> {contact.name}</p>
            <p> {contact.email}</p>
            <p> {contact.phonenumber}</p>
            <p> {contact.notes}</p>
            <button onClick={onClose}>Close</button>
        </div>
    )
}
export default ViewContact