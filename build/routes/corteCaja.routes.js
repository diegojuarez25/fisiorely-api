"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const corteCaja_controller_1 = require("../controllers/corteCaja.controller");
class CorteCajaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Crear un nuevo corte de caja
        this.router.post('/', corteCaja_controller_1.corteCajaController.realizarCorteCaja);
        // Obtener todos los cortes de caja
        this.router.get('/', corteCaja_controller_1.corteCajaController.obtenerCortesCaja);
        // Obtener un corte de caja por su ID
        this.router.get('/:id', corteCaja_controller_1.corteCajaController.obtenerCorteCajaPorId);
        // Eliminar un corte de caja por su ID
        this.router.delete('/:id', corteCaja_controller_1.corteCajaController.eliminarCorteCaja);
    }
}
const corteCajaRoutes = new CorteCajaRoutes();
exports.default = corteCajaRoutes.router;
