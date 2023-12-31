import React, { useState, useEffect } from 'react';
import Masonry from "react-responsive-masonry"; //content blocks
import Modal from 'react-modal'; //pop-up window
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //icons
import { library } from '@fortawesome/fontawesome-svg-core';  // Create a custom icon library
import { faEye, faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';  // Import the specific icons you need
library.add(faEye);  // Add the icons to the library

//components
import ViewContact from './ViewContacts';
import CreateContact from './CreateContactsForm';
import EditContact from './EditContactsModal';
import '../App.css'; //css

//below is necessary to bind modal to my appElement
//the if statement, avoids an error in my testing
if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');
// Modal.setAppElement('#root'); will throw an error for testing, use line 17 instead

function Contacts () {

    //state
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    
    //functions for onClick
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

    //make a req to backend, select * from contacts
    const loadContacts = async () => {
        try {
            const response = await fetch('http://localhost:1965/contacts');

            if(!response.ok) {
                throw new Error ("Failed to fetch contacts");
            }
            
            const fetchContacts = await response.json();
            console.log('select * from contacts', fetchContacts);
            setContacts(fetchContacts);
        } catch (error) {
            console.error('Error loading contacts')
        }

    }

    const handleDelete = async (contactId) => {
        try {
            console.log('Deleting contact with ID:', contactId);
          const response = await fetch(`http://localhost:1965/delete-contact/${contactId}`, {
            method: 'DELETE',
          });
      
          if (!response.ok) {
            throw new Error('Failed to delete contact');
          }
      
          // Remove the deleted contact from the state
          setContacts((prevContacts) =>
            prevContacts.filter((contact) => contact.id !== contactId)
          );
        } catch (error) {
          console.error('Error deleting contact:', error);
        }
      };
      

    //rerender page, need to understand this hook better
    useEffect (() => {
        loadContacts();
    }, []);

    return (
        <>
            <div className='ListContacts'>

                <Masonry columnsCount={2} gutter="60px">
                    {/* take list of contacts for each show name and icons */}
                    {contacts.map ((contactItem) => (
                        <div className='contactName' key={contactItem.id}>{contactItem.name}
                            <div>
                        <FontAwesomeIcon icon='eye' className='iconEye ' onClick={() => openModal(contactItem)}/>
                        <FontAwesomeIcon icon={faPenSquare} className='iconPen' onClick={() => openEdit(contactItem)}/>
                        <FontAwesomeIcon icon={faTrash} className='iconTrash' onClick={() => handleDelete(contactItem.contact_id)} />
                            </div>
                        </div>
                    ))}

                </Masonry>

            </div>
        
            {/* I can embed JS (&&) in JSX by using {}. If the cond. is true element after && will appear */}
            {isModalOpen && (
                <ViewContact contact={selectedContact} onClose={closeModal} />
                )}
                
            {/* works with my state and onClick functions above */}
            {isEditOpen && (
                <EditContact contact={selectedContact} onClose={() => setIsEditOpen(false)} loadContacts={loadContacts}/>
                )}

            <CreateContact loadContacts={loadContacts}/>
        </>
    )

}

export default Contacts
