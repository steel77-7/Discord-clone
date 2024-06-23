require('dotenv').config()
const express = require ("express");
const cors = require ('cors');
const {createServer} = require('http');
const app = express();
const httpServer = createServer(app)
const socketConnection = require('./socketServer');
const db = require('./db.js')
app.use(cors({
    origin:"*",
    methods:["GET",'POST']
}));
app.use(express.json());

//socket connection 
socketConnection(httpServer);


httpServer.listen(process.env.PORT,()=>{
    console.log('Server is running on port ',process.env.PORT);
})
db();