import React, {useRef} from 'react';

function CreateContact () {

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

    return(
        <>
        </>
    )

}
    export default CreateContact