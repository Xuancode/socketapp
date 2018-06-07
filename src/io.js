function socket_io(server) {
  var io = require('socket.io')(server);

  // io监听连接
  io.on('connection', function(socket) {
    socket.emit('news', { hello: 'world22' });
    socket.on('xiaoming', function(data) {
      console.log(data);
    });
    global.socket = socket;
  });
  global.io = io;
}

module.exports = socket_io;
