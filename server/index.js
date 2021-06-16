// Importar librerias
var express = require('express');
var app = express();
var server = require('http').Server(app);
//Cofiguracion basica
var io = require('socket.io')(server);

// Uso de middleware
app.use(express.static('client'));

//Creacion de una ruta de Testing del servicio
app.get('/hola-mundo', (req, res) => {
    res.status(200).send('Hola Mundo');
});

var message = [{
    id: 1,
    texto:'Bienvenido al Chat',
    nickname: 'Bot'
}];

//Recibir conexiones del cliente
io.on('connection', (socket) => {
    console.log('El Equipo con IP '+ socket.handshake.address+' se ha conectado.');

    socket.emit('messages', message);

    socket.on('add-message', (data) => {
        message.push(data);

        io.sockets.emit('messages', message);
    });
});

//Creamos el servidor y lo ponemos a la escucha
server.listen(6677, () => {
    console.log("Servidor esta funcionando en https://chatnodejs-socketio.herokuapp.com/");
});