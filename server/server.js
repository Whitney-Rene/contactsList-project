const express = require('express');
const cors = require ('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());