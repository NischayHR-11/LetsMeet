const {Server}= require("socket.io");

const connectToSocket=(server)=>{

    const io= new Server(server);
    return io;
}

module.exports = connectToSocket;