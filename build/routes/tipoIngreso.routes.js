"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoIngreso_controller_1 = require("../controllers/tipoIngreso.controller");
class TipoIngresoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todos los tipos de ingreso
        this.router.get('/', tipoIngreso_controller_1.tipoIngresoController.obtenerTiposIngreso);
        // Obtener un tipo de ingreso por su ID
        this.router.get('/:id', tipoIngreso_controller_1.tipoIngresoController.obtenerTipoIngresoPorId);
        // Crear un nuevo tipo de ingreso
        this.router.post('/', tipoIngreso_controller_1.tipoIngresoController.agregarTipoIngreso);
        // Actualizar un tipo de ingreso existente
        this.router.put('/:id', tipoIngreso_controller_1.tipoIngresoController.actualizarTipoIngreso);
        // Eliminar un tipo de ingreso por su ID
        this.router.delete('/:id', tipoIngreso_controller_1.tipoIngresoController.eliminarTipoIngreso);
    }
}
const tipoIngresoRoutes = new TipoIngresoRoutes();
exports.default = tipoIngresoRoutes.router;
