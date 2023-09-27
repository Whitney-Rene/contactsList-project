import React, { useState, useEffect } from 'react';
import ViewContact from './view-contacts';
import Modal from 'react-modal';
import CreateContact from './create-contacts'
import Masonry from "react-responsive-masonry";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Create a custom icon library
import { library } from '@fortawesome/fontawesome-svg-core';

// Import the specific icons you need
import { faEye, faPenSquare } from '@fortawesome/free-solid-svg-icons';

// Add the icons to the library
library.add(faEye);


Modal.setAppElement('#root');

function Contacts () {

    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setSelectedContact(null);
        setIsModalOpen(false);
    }

    const loadContacts = async () => {
        try {
            const response = await fetch('http://localhost:1965/contacts');

            if(!response.ok) {
                throw new Error ("Failed to fetch contacts");
            }
            
            const fetchContacts = await response.json();
            console.log('selectedContact', fetchContacts);
            setContacts(fetchContacts);
        } catch (error) {
            console.error('Error loading contacts')
        }

    }

    useEffect (() => {
        loadContacts();
    }, []);

    return (
        <>
          <div className='ListContacts'>

            <Masonry columnsCount={2} gutter="40px">

                {contacts.map ((contactItem) => (
                    <div className='contactName' key={contactItem.id}>{contactItem.name}
                    <FontAwesomeIcon icon='eye' className='iconEye ' onClick={() => openModal(contactItem)}/>
                    <FontAwesomeIcon icon={faPenSquare} className='iconPen'/>
                    </div>
                ))}

            {isModalOpen && (
                <ViewContact contact={selectedContact} onClose={closeModal} />
            )}

            </Masonry>
        </div>

        <CreateContact loadContacts={loadContacts}/>
        </>
    )

}


export default Contacts