"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultas_controller_1 = require("../controllers/consultas.controller");
class ConsultasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todas las consultas
        this.router.get('/', consultas_controller_1.consultasController.obtenerConsultas);
        // Obtener una consulta por su ID
        this.router.get('/:id', consultas_controller_1.consultasController.obtenerConsultaPorId);
        // Crear una nueva consulta
        this.router.post('/', consultas_controller_1.consultasController.agregarConsulta);
        // Actualizar una consulta existente
        this.router.put('/:id', consultas_controller_1.consultasController.actualizarConsulta);
        // Eliminar una consulta por su ID
        this.router.delete('/:id', consultas_controller_1.consultasController.eliminarConsulta);
    }
}
const consultasRoutes = new ConsultasRoutes();
exports.default = consultasRoutes.router;
