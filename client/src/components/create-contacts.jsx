import React, {useRef} from 'react';
import '../App.css'

function CreateContact () {

    const contactName = useRef();
    const contactEmail = useRef();
    const contactPN = useRef();
    const contactBD = useRef();

    const handlePostRequest = async () => {
        try {
            const response = await fetch ('http:localhost: 1965/addcontact', {
                method: 'POST',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify(data)
            });

            if(!response.ok) {
                throw new Error('Failed to add contact');
            };

            const responseData = await response.json();
        // console.log(responseData)
        } catch(error) {
            console.error('Error while adding contact:', error);
        }
    
      };

      const handleSubmit = (e) => {

      }

    return(
        <>

        <form className='form' onSubmit={handleSubmit}>

            <p>add a contact</p>

            <label for='contactname'>Contact Name</label>
            <input type='text' name='contactname' required placeholder='name' ref={contactName}/>

            <label for='email'>Contact Email</label>
            <input type='text' name='email' required placeholder='email' ref={contactEmail}/>

            <label for='phonenumber'>Contact PhoneNumber</label>
            <input type='text' name='phonenumber' placeholder='123-456-7890' ref={contactPN}/>

            <label for='notes'>Notes?</label>
            <input type='text' name='notes' placeholder='bday?' ref={contactBD}/>

            <div className='createButton'>
                <button  type='submit'>Create New Contact</button>
            </div>

        </form>

        </>
    )

}
    export default CreateContact