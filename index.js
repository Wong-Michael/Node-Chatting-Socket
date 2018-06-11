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
  

  socket.on('New Name', function(msg) {
    socket.broadcast.emit('New Name', msg.name)
  });

  socket.on('chat', function(msg) {
    var username = msg.name;
    var text = msg.text;
    console.log("chat: ", msg);
    io.emit('chat', msg);

  });

});
setInterval(() => io.emit('time', new Date().toTimeString(), "Hello Android from Heroku"), 1000);