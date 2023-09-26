const express = require('express'); // imports expresss framework
const cors = require('cors');  //cors middleware, ensure app is running at one domain only
require('dotenv').config(); // imports & invokes the dotenv module , loads env variables from .env file
const db = require('./db/db-connection.js'); //imports db-connection module, sets up db connectivity
// const bodyParser = require('body-parser'); //not needed

const app = express(); 
const PORT = process.env.PORT; 

//middleware
app.use(cors());    //configures and uses CORS (Cross-Origin Resource Sharing)
app.use(express.json());    //to parse JSON data and populate req.body with parsed JSON object, needed to post and put request
// app.use(bodyParser.json()); //existed before `express.json(), you don't need both

app.get('/', (req, res) => {
        //used to access data that was sent in the req body (form data or JSON data)
    console.log(req.body); //often empty for get requests
        //http://example.com/resource?param1=value1&param2=value2, req.query would contain { param1: 'value1', param2: 'value2' }
        //you're not parsing or handling query parameters explicitly, which is why req.query is empty
    console.log(req.query); //contains query parameters sent with request
        ///users/:userId, you can access userId via req.params.userId
    console.log(req.params); //object used to access route params
    res.json('Hola, como te va?');
});

// this route should respond to requests made to the "/contacts" endpoint
app.get('/contacts', async (req, res) => {
    try {
        const {rows: contacts } = await db.query ('SELECT * FROM contacts');
        //After fetching data from the database, this code sends a response to the client
        res.send(contacts)
    //error handling
    } catch (error) {
        return res.status(400).json({error});
    }

});




app.listen(PORT, () => {
    console.log(`Hola, Te quiero mama ${PORT}`)
})
//I was having issues with running 2 apps on one port:
    //lsof -i :1965 //who is listening on this port? 
    //17841 is also listening on port 1965
    //kill 17841