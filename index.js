const express = require('express');
const path = require('path');
require('dotenv').config();
const {dbConnection} = require('./database/config');
dbConnection();

const app = express();

app.use(express.json());

const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', client => {
    console.log('cliente conectado');

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

});


const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// RUTAS
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);
    console.log(`Servidor funcionando en puerto http://localhost:3000`, process.env.PORT)
})
