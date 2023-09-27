import React, { useState, useEffect } from 'react';

import ViewContact from './view-contacts';
import CreateContact from './create-contacts';
import EditContact from './edit-contacts';

import Masonry from "react-responsive-masonry";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css';


import { library } from '@fortawesome/fontawesome-svg-core';  // Create a custom icon library
import { faEye, faPenSquare } from '@fortawesome/free-solid-svg-icons';  // Import the specific icons you need
library.add(faEye);  // Add the icons to the library


Modal.setAppElement('#root');

function Contacts () {

    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const openModal = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    }

    const openEdit = (contact) => {
        console.log("Editing contact:", contact);
        setSelectedContact(contact);
        setIsEditOpen(true);
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
                        <FontAwesomeIcon icon={faPenSquare} className='iconPen' onClick={() => openEdit(contactItem)}/>
                        </div>
                    ))}

                </Masonry>

            </div>
        
            {isModalOpen && (
                <ViewContact contact={selectedContact} onClose={closeModal} />
            )}

            {isEditOpen && 
                <EditContact contact={selectedContact} onClose={() => setIsEditOpen(false)} loadContacts={loadContacts}/> }

            <CreateContact loadContacts={loadContacts}/>
        </>
    )

}


export default Contacts