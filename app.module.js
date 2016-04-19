var chatApp = angular.module('chatApp', ['io']);
chatApp.Controller('chatController', function ($scope) {
  console.log('here');
/*
 // var socketio = io.connect('127.0.0.1:8100');
    var socketio = io.connect('10.150.51.180:8100');
    // console.log(socketio);

    /// get/receive the message from the server
    socketio.on('message_to_client', function(data) {
        console.log(data);
        document.getElementById('chat-window').innerHTML += '<div class="im">' + data.message + '</div>';
    });

    ///send message to the server
    function sendMessage() {
        event.preventDefault();
        var message = document.getElementById('message').value;
        var name = document.getElementById('name').value;
        if (name === '') {
          alert('please enter your name');
          return;
        }
        socketio.emit('message_to_server', {
            message: message,
            name: name
        });
    }
  */

});


