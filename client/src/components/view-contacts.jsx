import React from 'react';
import '../App.css'

function ViewContact ({contact, onClose}) {
    // console.log(contact);
    return(
        <>
            <div class="backdrop"></div>
            <div className='modal'>
                <p> {contact.name}</p>
                <p> {contact.email}</p>
                <p> {contact.phonenumber}</p>
                <p> {contact.notes}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </>
    )
}
export default ViewContact