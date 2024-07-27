const express = require('express')
require("dotenv").config();
const path = require("path");

const app = express()
const port = process.env.PORT || 3001;
app.use(express.static('public'));
app.get("/short", (req, res) => {

})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html') 
    
})

app.listen(port)