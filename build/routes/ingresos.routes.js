"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingresos_controller_1 = require("../controllers/ingresos.controller");
class IngresosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todos los ingresos
        this.router.get('/', ingresos_controller_1.ingresosController.obtenerIngresos);
        // Obtener un ingreso por su ID
        this.router.get('/:id', ingresos_controller_1.ingresosController.obtenerIngresoPorId);
        // Crear un nuevo ingreso
        this.router.post('/', ingresos_controller_1.ingresosController.agregarIngreso);
        // Actualizar un ingreso existente
        this.router.put('/:id', ingresos_controller_1.ingresosController.actualizarIngreso);
        // Eliminar un ingreso por su ID
        this.router.delete('/:id', ingresos_controller_1.ingresosController.eliminarIngreso);
    }
}
const ingresosRoutes = new IngresosRoutes();
exports.default = ingresosRoutes.router;
