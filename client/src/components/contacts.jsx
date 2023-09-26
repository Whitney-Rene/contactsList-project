import React, { useState, useEffect } from 'react';
import Masonry from "react-responsive-masonry"

function Contacts () {

    const [contacts, setContacts] = useState([]);

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
                {contacts.map((contactItem) => {
                    
                    return (
                            <div key={contactItem.id} className='MasCard'>{contactItem.name}</div>
                    )

                })
                }
                </Masonry>
            </div>
        </>
    )

}


export default Contacts