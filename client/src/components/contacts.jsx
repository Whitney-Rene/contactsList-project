import React, { useState, useEffect } from 'react';
import ViewContact from './view-contacts';
import Modal from 'react-modal';
import CreateContact from './create-contacts'
import Masonry from "react-responsive-masonry";

// Modal.setAppElement('#yourAppElement');

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
            // console.log('what is being returned from the call?', fetchContacts);
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

            <Masonry columnsCount={1} gutter="16px">

                {contacts.map ((contactItem) => (
                    <div key={contactItem.id}>{contactItem.name}
                    <button onClick={() => openModal(contactItem)}>View Details</button>
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