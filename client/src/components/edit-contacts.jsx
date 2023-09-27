import '../App.css';
import Modal from 'react-modal';

import { useState} from 'react';

function EditContact ({contact, onClose, loadContacts}) {
    
    const [editedContact, setEditedContact] = useState({...contact});
    console.log("editedContact", editedContact);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedContact( {
            ...editedContact,
            [name]: value,
        });
    };

    const handleSave = async () => {
        //'/editcontact/:contactId'
        try {
            const response = await fetch(`http://localhost:1965/editcontact/${editedContact.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editedContact),
        });

        if(!response.ok) {
            throw new Error ('Failed to update contact');
        }

        //the location of this matters
        await loadContacts();

        const data = await response.json();

        onClose(); //close the modal

        //???
        // onUpdateStudent(data);
        // //???
        // clearForm();
    } catch (error) {
        console.error('Error updating contact:', error);
    }

    };

    return (
        <>
            <Modal
            className='backdrop'
            isOpen={true} // Set this to control the modal's visibility
            onRequestClose={onClose} // Function to close the modal
            contentLabel="Edit Contact Modal"
            >

                <div className='editContactModal'>

                <p className='formTitle'>edit a contact:</p>

                <form>

                    <label>Name:</label>
                    <input type='text' name='name' value={editedContact.name} onChange={handleInputChange}/>

                    <label>Email:</label>
                    <input type='text' name='email' value={editedContact.email} onChange={handleInputChange}/>

                    <label>Phone Number:</label>
                    <input type='text' name='phonenumber' value={editedContact.phonenumber} onChange={handleInputChange}/>

                    <label>Notes:</label>
                    <input type='text' name='notes' value={editedContact.notes} onChange={handleInputChange}/>

                    <div className='space'>
                        <button  className='createButton' type='button' onClick={handleSave}>Save</button>
                        <button  className='createButton' type='button' onClick={onClose}>Cancel</button>
                    </div>

                </form>

                </div>

            </Modal>
        </>
    )
};

export default EditContact
