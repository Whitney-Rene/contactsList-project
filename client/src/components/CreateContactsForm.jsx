import React, { useState, useRef } from 'react'; //for state
import '../App.css'; //css


function CreateContact ({loadContacts}) {

    //hook to grab info from input boxes
    const contactName = useRef();
    const contactEmail = useRef();
    const contactPN = useRef();
    const contactNotes = useRef();
    const [successMsg, setSuccessMsg] = useState(false);

    //send request to api (here is data) INSERT INTO contacts ...
    const handlePostRequest = async (data) => {
        try {
            const response = await fetch ('http://localhost:1965/addcontact', {
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify(data)
            });

            if(!response.ok) {
                throw new Error('Failed to add contact');
            };

            //rerenders page with new added contact
            await loadContacts();
            setSuccessMsg(true);
            //why is that shaded out?
            const responseData = await response.json();
        // console.log(responseData)
        } catch(error) {
            console.error('Error while adding contact:', error);
        }
    
      };

    //handle submit button
    const handleSubmit = async (e) => {

        e.preventDefault();

        const newContact = {name: contactName.current?.value, email: contactEmail.current?.value, phonenumber: contactPN.current?.value, notes: contactNotes.current?.value}
        console.log('did I grab it?', newContact);

        try {
            await handlePostRequest(newContact); // Wait for the POST request to complete
            contactName.current.value = '';
            contactEmail.current.value = '';
            contactPN.current.value = '';
            contactNotes.current.value = '';
          } catch (error) {
            console.error('Error while adding contact:', error);
          }

        };

    return(
        <>

        {/* simple form to create new contact */}
        <form className='form' onSubmit={handleSubmit}>

            <p className='formTitle'>add a contact:</p>

            <label>Contact Name</label>
            <input type='text' name='contactname' required placeholder='name' ref={contactName}/>

            <label>Contact Email</label>
            <input type='text' name='email' required placeholder='email' ref={contactEmail}/>

            <label>Contact PhoneNumber</label>
            <input type='text' name='phonenumber' required placeholder='123-456-7890' ref={contactPN}/>

            <label>Notes?</label>
            <input type='text' name='notes' required placeholder='bday? fav candy?' ref={contactNotes}/>

            <div className='space'>
                <button  className='createButton' type='submit'>Create New Contact</button>
            </div>

        </form>

        <div className='success-message'>{successMsg && <p>new contact successfully submitted!</p>}</div>

        </>
    )

}
    export default CreateContact