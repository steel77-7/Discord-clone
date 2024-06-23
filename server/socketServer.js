const {Server} = require('socket.io');

const socketConnection =(httpServer)=>{
    const io = new Server(httpServer,{
        origin: "*",
        method:["GET","POST"]
    })

    io.on('connection',socket=>{
        socket.on('join-room',(room)=>{
            socket.join(room)
        })
        socket.on('direct-message',()=>{

        })
        
    })

}

module.exports = socketConnection;