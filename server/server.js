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




app.use('/auth', require("./routes/authRoute.js"))
app.use('/chat', require("./routes/chatRoute.js"))
app.use('/message', require("./routes/messageRoute.js"))
//listening in the specified port
httpServer.listen(process.env.PORT,()=>{
    console.log('Server is running on port ',process.env.PORT);
})
//connection to mongodb
db();

//socket connection 
socketConnection(httpServer);