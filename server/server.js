const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');
// const bodyParser = require('body-parser'); //not needed

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(cors());
app.use(express.json()); //to parse JSON data from  and populate req.body with parsed JSON object, needed to post and put request
// app.use(bodyParser.json()); //existed before `express.json(), you don't need both

app.get('/', (req, res) => {
    //used to access data that was sent in the req body (form data or JSON data)
    console.log(req.body) //often empty for get requests
    //http://example.com/resource?param1=value1&param2=value2, req.query would contain { param1: 'value1', param2: 'value2' }
    //you're not parsing or handling query parameters explicitly, which is why req.query is empty
    console.log(req.query) //contains query parameters sent with request
    ///users/:userId, you can access userId via req.params.userId
    console.log(req.params) //object used to access route params
    res.json('Hola, como te va?')
})


// lsof -i :1965 //who is listening on this port? =17841
//kill 17841

app.listen(PORT, () => {
    console.log(`Hola, Te quiero mama ${PORT}`)
})