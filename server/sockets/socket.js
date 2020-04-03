const { io } = require('../server');
const { Usuario } = require('../classes/usuario');
const { crearMensaje } = require('../util/utilidades');

const usuarios = new Usuario();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                ok: false,
                mensaje: 'El nombre debe ser proporcionado'
            });
        }
        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} entro`));
        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.obtenerPersonasSala(data.sala));
        callback(usuarios.obtenerPersonasSala(data.sala));
    });
    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.obtenerPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje)
    });
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.obtenerPersonasSala(personaBorrada.sala));
    });

    //Mensaje privado
    client.on('mensajePrivado', data => {
        let persona = usuarios.obtenerPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('mensajePrivado', mensaje);
    });


});