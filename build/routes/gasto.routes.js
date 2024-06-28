"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gasto_controller_1 = require("../controllers/gasto.controller");
class GastosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todos los gastos
        this.router.get('/', gasto_controller_1.gastosController.obtenerGastos);
        // Obtener un gasto por su ID
        this.router.get('/:id', gasto_controller_1.gastosController.obtenerGastoPorId);
        // Crear un nuevo gasto
        this.router.post('/', gasto_controller_1.gastosController.agregarGasto);
        // Actualizar un gasto existente
        this.router.put('/:id', gasto_controller_1.gastosController.actualizarGasto);
        // Eliminar un gasto por su ID
        this.router.delete('/:id', gasto_controller_1.gastosController.eliminarGasto);
    }
}
const gastosRoutes = new GastosRoutes();
exports.default = gastosRoutes.router;
