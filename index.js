const express = require('express');
const path = require('path');
require('dotenv').config();
const {dbConnection} = require('./database/config');
const { checkJWT } = require('./helpers/jwt');
const { userConnected, userDisconnected, saveMessage } = require('./controllers/socket');
dbConnection();

const app = express();

app.use(express.json());

const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', client => {
    console.log('cliente conectado');

    const [isAuthorized, uuid] = checkJWT(client.handshake.headers['authorization']);

    if(!isAuthorized) {return client.disconnect();}

    userConnected(uuid);

    client.join(uuid);

    client.on('mensaje-personal', async payload => {
        await saveMessage(payload);
        io.to(payload.to).emit('mensaje-personal', payload);

    })

    client.on('disconnect', () => {
        console.log('cliente desconectado');
        userDisconnected(uuid);
    });

});


const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// RUTAS
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/mensajes', require('./routes/mensajes'));

server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);
    console.log(`Servidor funcionando en puerto http://localhost:3000`, process.env.PORT)
})
