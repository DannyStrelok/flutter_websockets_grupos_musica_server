const io = require('../index');

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