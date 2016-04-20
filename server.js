const PORT = process.env.PORT || 8100;
const contentTypeHtml = { 'content-type': 'text/html' };
const contentTypeIcon = { 'content-type': 'image/x-icon' };
const contentTypePng = { 'content-type': 'image/png' }; //use response.end(img, 'binary');

var http = require('http');
var url = require('url');
var fs = require('fs');
var MessageArr = [];
function Message (name, text, date) {
  this.name = name;
  this.message = text;
  this.date = date;
}


var server = http.createServer(requestHandler);

server.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});

var io = require('socket.io').listen(server);

io.sockets.on('connect', function(socket) {
    console.log('someone connected to the server!!');
    console.log(MessageArr);
    var i;
    for (i=0; i<MessageArr.length; i++) {
      if (i===0) {
        socket.emit('message_to_client', 'history-header');
      }
      socket.emit('message_to_client', { history: true, message: MessageArr[i].message, name: MessageArr[i].name, date: MessageArr[i].date.toLocaleString() });
    }
    if (i>0) {
        socket.emit('message_to_client', 'history-trailer');
      }

    //next line adds the below listener to each socket that connected!    
    socket.on('message_to_server', function(data) {
       var msg = new Message();
       msg.name = data.name;
       msg.message = data.message;
       msg.date = new Date();
       MessageArr.push(msg);

        console.log("Received from client");
        console.log(data);

        //when a message is received, emit to all the clients
        io.sockets.emit('message_to_client', { message: data.message, name: data.name, date: msg.date.toLocaleString() });
    })
})

function requestHandler(req, resp) {
    var urlParts = url.parse(req.url, true);
    var query = urlParts.query;
    var path = urlParts.pathname;
    fs.readFile('index.html', 'utf-8', function(error, data) {
        // resp.statusCode = 200;
        // resp.setHeader(contentTypeHtml);
        resp.writeHead(200, contentTypeHtml);
        resp.write('<script>port='+PORT+'</script>');
        resp.write(data);
        resp.end();
    });

    // console.log('path = ' + path);
    // for (var prop in query) {
    //     console.log(prop + '=' + query[prop])
    // }

}
