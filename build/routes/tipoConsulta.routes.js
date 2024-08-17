"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoConsulta_controller_1 = require("../controllers/tipoConsulta.controller");
class TipoConsultaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todos los tipos de consulta
        this.router.get('/', tipoConsulta_controller_1.tipoConsultaController.obtenerTiposConsulta);
        // Obtener un tipo de consulta por su ID
        this.router.get('/:id', tipoConsulta_controller_1.tipoConsultaController.obtenerTipoConsultaPorId);
        // Crear un nuevo tipo de consulta
        this.router.post('/', tipoConsulta_controller_1.tipoConsultaController.agregarTipoConsulta);
        // Actualizar un tipo de consulta existente
        this.router.put('/:id', tipoConsulta_controller_1.tipoConsultaController.actualizarTipoConsulta);
        // Eliminar un tipo de consulta por su ID
        this.router.delete('/:id', tipoConsulta_controller_1.tipoConsultaController.eliminarTipoConsulta);
    }
}
const tipoConsultaRoutes = new TipoConsultaRoutes();
exports.default = tipoConsultaRoutes.router;
