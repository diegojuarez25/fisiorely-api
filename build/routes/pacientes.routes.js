"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacientes_controller_1 = require("../controllers/pacientes.controller");
class PacientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todos los pacientes
        this.router.get('/', pacientes_controller_1.pacientesController.obtenerPacientes);
        // Obtener un paciente por su ID
        this.router.get('/:id', pacientes_controller_1.pacientesController.obtenerPacientePorId);
        // Crear un nuevo paciente
        this.router.post('/', pacientes_controller_1.pacientesController.agregarPaciente);
        // Actualizar un paciente existente
        this.router.put('/:id', pacientes_controller_1.pacientesController.actualizarPaciente);
        // Eliminar un paciente por su ID
        this.router.delete('/:id', pacientes_controller_1.pacientesController.eliminarPaciente);
    }
}
const pacientesRoutes = new PacientesRoutes();
exports.default = pacientesRoutes.router;
