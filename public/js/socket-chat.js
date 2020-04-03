var socket = io();


var parametros = new URLSearchParams(window.location.search);
if (!parametros.has('nombre') || !parametros.has('sala')) {
    console.log('aca aca aca');
    window.location = 'index.html';
    throw new Error('El nombre o sala deben ser proporcionados');
}
var usuario = {
    nombre: parametros.get('nombre'),
    sala: parametros.get('sala')
}
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(rsp) {
        console.log('Usuarios conectados: ', rsp);
    });
});
socket.on('salirChat', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información de nuevos mensajes
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});
// Escuchar información del listado actual de personas
socket.on('listaPersonas', function(mensaje) {

    console.log(mensaje);

});

//Escuchar o emitir informacion o mensajes privados 
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado: ', mensaje);
})