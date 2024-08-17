"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todos los usuarios
        this.router.get('/', usuarios_controller_1.usuariosController.obtenerUsuarios);
        // Obtener un usuario por su ID
        this.router.get('/:id', usuarios_controller_1.usuariosController.obtenerUsuarioPorId);
        // Crear un nuevo usuario
        this.router.post('/', usuarios_controller_1.usuariosController.agregarUsuario);
        // Actualizar un usuario existente
        this.router.put('/:id', usuarios_controller_1.usuariosController.actualizarUsuario);
        // Eliminar un usuario por su ID
        this.router.delete('/:id', usuarios_controller_1.usuariosController.eliminarUsuario);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
