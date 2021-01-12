const express = require('express');
const path = require('path');
require('dotenv').config();


const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', client => {
    console.log('cliente conectado');
    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje')
        console.log(payload);

        io.emit('mensaje', {respuesta: 'respuesta al mensaje'})

    })

});


const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);
    console.log(`Servidor funcionando en puerto`, process.env.PORT)
})
