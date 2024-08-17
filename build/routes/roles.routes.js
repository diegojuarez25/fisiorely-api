"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roles_controller_1 = require("../controllers/roles.controller");
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todos los roles
        this.router.get('/', roles_controller_1.rolesController.obtenerRoles);
        // Obtener un rol por su ID
        this.router.get('/:id', roles_controller_1.rolesController.obtenerRolPorId);
        // Crear un nuevo rol
        this.router.post('/', roles_controller_1.rolesController.agregarRol);
        // Actualizar un rol existente
        this.router.put('/:id', roles_controller_1.rolesController.actualizarRol);
        // Eliminar un rol por su ID
        this.router.delete('/:id', roles_controller_1.rolesController.eliminarRol);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;
