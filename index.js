const express = require('express');
const socketIO = require('socket.io');

const hostname = '127.0.0.1';
const PORT =  process.env.PORT || 5000;

const server = express()
.use((req, res) => res.send('<h1>Hosting a socket io socket for an android app</h1>'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server)

io.on('connection', (socket) => {
  console.log('Client connected' + socket.id);

  socket.on('disconnect', () => console.log('Client disconnected'));

  socket.on('game-restart', function(msg) {
    var id = msg.id;
    console.log("game-restart: " , msg);
    console.log("Emitting to", "game-restart-" + id);
    io.emit('game-restart-' + id, msg);
   
  });

  socket.on('chat', function(msg) {
    var id = msg.id;
    var username = msg.username;
    var text = msg.text;
    console.log("chat: ", msg);
    io.emit('chat-' + id, msg);
    //to be filled in
  });

  socket.on('log', function(msg) {
    var id = msg.id;
    var text = msg.text
    console.log("log obj: " , msg);
    io.emit('log-' + id, msg);
    //to be filled in
  });
});
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);