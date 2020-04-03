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
    //console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(rsp1) {
        //console.log('Usuarios conectados: ', rsp);
        console.log('retorno de users', rsp1);
        renderizarUsuarios(rsp1);
    });
});
/* socket.on('salirChat', function(mensaje) {
    //console.log('Servidor:', mensaje);
    renderizarUsuarios(mensaje)
}); */

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// Escuchar información de nuevos mensajes
socket.on('crearMensaje', function(mensaje) {

    //console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false);
    scrollBottom();

});
// Escuchar información del listado actual de personas
socket.on('listaPersonas', function(mensaje) {

    //    console.log(mensaje);
    renderizarUsuarios(mensaje)
});
//Escuchar o emitir informacion o mensajes privados 
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado: ', mensaje);
})