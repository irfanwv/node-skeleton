
var ChatController     = require('../controllers/ChatController');
module.exports = function(server) {
    global.clients = {};
    global.io = require('socket.io').listen(server);
    io.on('connection', function (socket, req) {

        //Removing the socket on disconnect
        socket.on('disconnect', function () {
            for (var name in clients) {
                if (clients[name].socket === socket.id) {
                    delete clients[name];
                    break;
                }
            }
        });

        //Add user
        socket.on('add-user', function (data) {
            clients[data.user_id] = {
                "socket": socket.id,
                "user_name": data.user_name,
                "user_image": data.user_image
            };

            //Add user in online array
            io.emit('onine-user', clients);
        });

        //Send point to point message
        socket.on('private-message', function (data) {
            console.log("Sending: " + data.message + " to " + data.to_id);
            if (clients[data.to_id]) {
                //Add socketId
                data.socket_id = clients[data.to_id].socket;
                data.receiver_name = clients[data.to_id].user_name;
                data.read_flag = false;

                //Save message & get message Id by CallBack
                ChatController.saveMessage(data, function(cb) {
                    data.id = cb;

                    //Emit message to receiver
                    io.sockets.connected[clients[data.to_id].socket].emit("add-message", data);
                    //Emit message to sender
                    io.sockets.connected[clients[data.from_id].socket].emit("add-message", data);
                });
            } else {
                console.log("User does not exist: " + data.username);
            }
        });

    });
}