import React from 'react'; 
import '../App.css' //css

function ViewContact ({contact, onClose}) {
    // console.log(contact);
    return(
        <>
            <div class="backdrop"></div>
            {/* print info on card and button with onClick=prop */}
            <div className='modal'>
                <p> {contact.name}</p>
                <p> {contact.email}</p>
                <p> {contact.phonenumber}</p>
                <p> {contact.notes}</p>
                <button className='close' onClick={onClose}>Close</button>
            </div>
        </>
    )
}
export default ViewContact