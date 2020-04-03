class Usuario {
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personas.push(persona);
        return this.personas;
    }
    obtenerPersona(id) {
        let persona = this.personas.filter(p => p.id === id)[0];
        return persona;
    }
    obtenerPersonas() {
        return this.personas;
    }
    obtenerPersonasSala(sala) {
        let personasSala = this.personas.filter(p => p.sala === sala);
        return personasSala;

    }
    borrarPersona(id) {
        let personaBorrada = this.obtenerPersona(id);
        this.personas = this.personas.filter(p => p.id != id);
        return personaBorrada;
    }
};
module.exports = {
    Usuario
}