-- contactsList Project

--create db
CREATE DATABASE contacts;

--connect to contacts db
\c contacts;

--create contacts table
CREATE TABLE contacts (contact_id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, email TEXT NOT NULL, phonenumber TEXT, notes TEXT);
--notes about contacts table
-- Contact ID (id SERIAL PRIMARY KEY) //123
-- Name (VARCHAR or TEXT) *required  //Whitney
-- Email (TEXT) *required         //[1, 2]  (validation for valid email)
-- Phone (VARCHAR or TEXT-most flexible, stores as strings and allows special characters) *optional        //919-123-2345  (maybe I can have function on the front end that strips the numbers string of any special characters?  OR a validation in the input field that does not allow for special characters)
-- Notes (TEXT) *optional            


--INSERT entity in contact table
--remember, no double quotes
INSERT INTO contacts (name, email, phonenumber, notes) VALUES ('Whitney-Rene', 'sEWR@gmail.com', '919-123-2345', 'Birthday: 10/12');

INSERT INTO contacts (name, email, phonenumber, notes) VALUES ('Valerie-Hope', 'bMITWvh@gmail.com', '794-788-9987', 'Birthday: 02/12');

INSERT INTO contacts (name, email, phonenumber, notes) VALUES ('Britney-Sade', 'bSITWvh@gmail.com', '111-788-9987', 'Birthday: 10/12');

--UPDATE column values
UPDATE contacts SET notes = 'Birthday: 02/12' WHERE contact_id = 2;

--DELETE rows/entities
DELETE FROM contacts WHERE contact_id IN (1, 2, 3, 4, 5);
