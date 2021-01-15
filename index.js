const express = require('express');
const path = require('path');
const Bands = require('./models/bands');
const Band = require('./models/band');
require('dotenv').config();

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const bands = new Bands();

bands.addBand(new Band('Slipknot'));
bands.addBand(new Band('Limp bizkit'));
bands.addBand(new Band('Adele'));
bands.addBand(new Band('Aerosmith'));

io.on('connection', client => {
    console.log('cliente conectado');

    client.emit('grupos-activos', bands.getBands() );

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje')
        console.log(payload);

        io.emit('mensaje', {respuesta: 'respuesta al mensaje'})

    })

    client.on('emitir-mensaje', (payload) => {
        console.log(payload);
        client.broadcast.emit('nuevo-mensaje', payload);
    });

    client.on('vote-band', (data) => {
        bands.voteBand(data.id);
        io.emit('grupos-activos', bands.getBands() );
    })

    client.on('add-band', (data) => {
        bands.addBand(new Band(data.name));
        io.emit('grupos-activos', bands.getBands() );
    })

    client.on('delete-band', (data) => {
        bands.deleteBand(data.id);
        io.emit('grupos-activos', bands.getBands() );
    })

});


const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);
    console.log(`Servidor funcionando en puerto`, process.env.PORT)
})
