const slug = require('slug');
const { nanoid } = require('nanoid');
const hooks = {}


hooks.proyectoHooks = {
    beforeCreate(proyecto) {

        const url = `${slug(proyecto.nombre)}-${nanoid(10)}`;
        proyecto.url = url;
    }
}

module.exports = hooks;