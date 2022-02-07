const http = require("http");
const io = require("socket.io");

const apiServer = require("./api");
const socketsHandler=  require("./sockets")

const PORT = 3000;

const httpServer = http.createServer(apiServer);
const socketServer = new  io.Server(httpServer,{
    cors  : {
        origin : "*",
        methods : ["GET" , "POST"]
    }
})

socketsHandler(socketServer)

httpServer.listen(PORT);
console.log(`listening.... ${PORT}`);
