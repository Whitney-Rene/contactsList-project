import React, { useState } from 'react';
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
            setContacts(fetchContacts);
        } catch (error) {
            console.error('Error loading contacts')
        }

    }

    const loadStudents = () => {
        // A function to fetch the list of students that will be load anytime that list change
        fetch("http://localhost:8080/api/students")
        .then((response) => response.json())
        .then((students) => {
            setStudents(students);
        });
    };
    return (
        <>
        <Masonry>
        </Masonry>
        </>
    )

}

export default Contacts