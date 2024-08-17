"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formaPago_controller_1 = require("../controllers/formaPago.controller");
class FormaPagoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todas las formas de pago
        this.router.get('/', formaPago_controller_1.formaPagoController.obtenerFormasPago);
        // Obtener una forma de pago por su ID
        this.router.get('/:id', formaPago_controller_1.formaPagoController.obtenerFormaPagoPorId);
        // Crear una nueva forma de pago
        this.router.post('/', formaPago_controller_1.formaPagoController.agregarFormaPago);
        // Actualizar una forma de pago existente
        this.router.put('/:id', formaPago_controller_1.formaPagoController.actualizarFormaPago);
        // Eliminar una forma de pago por su ID
        this.router.delete('/:id', formaPago_controller_1.formaPagoController.eliminarFormaPago);
    }
}
const formaPagoRoutes = new FormaPagoRoutes();
exports.default = formaPagoRoutes.router;
