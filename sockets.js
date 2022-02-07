module.exports = (io) => {
  const chatNamespace = io.of("/chat");
  const pongNamespace = io.of("/pong");

  io.on("connection", (socket) => {
    console.log("io:" + socket.id);
  });
  let playerCount = 0;
  let hosts = [];
  pongNamespace.on("connection", (socket) => {
    console.log(`${socket.id} connected to pong namespace`);

    // client loaded all necessary things and can join a game
    socket.on("ready", (payload) => {
      playerCount++;
      const playerId = socket.id;
      if (playerCount % 2 == 0) {
        hostId = hosts[hosts.length - 1];
        socket.join(hostId);
        // Notify partnership
        const data = {
          hostId,
          playerId,
        };
        pongNamespace.in(hostId).emit("matched", data);
      } else {
        hosts.push(playerId);
      }
    });
    // client game begins
    socket.on("startGame", (payload) => {
      console.log(`${socket.id} is starting`);

    });

    socket.on("paddleMove", (payload) => {
      console.log(`${socket.id} is paddleMove`);
      const  { host , postion } =  payload;
      console.log(payload)
      socket.to(host).emit("paddleMove",{postion});
    });

    socket.on("ballMove", (payload) => {
      console.log(`${socket.id} is BallMove`);
    });

    // startGame - Game can begin
    // paddle moves
    // ball move
    // Change of score
  });
};
