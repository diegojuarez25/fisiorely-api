"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modalidad_controller_1 = require("../controllers/modalidad.controller");
class ModalidadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todas las modalidades
        this.router.get('/', modalidad_controller_1.modalidadController.obtenerModalidades);
        // Obtener una modalidad por su ID
        this.router.get('/:id', modalidad_controller_1.modalidadController.obtenerModalidadPorId);
        // Crear una nueva modalidad
        this.router.post('/', modalidad_controller_1.modalidadController.agregarModalidad);
        // Actualizar una modalidad existente
        this.router.put('/:id', modalidad_controller_1.modalidadController.actualizarModalidad);
        // Eliminar una modalidad por su ID
        this.router.delete('/:id', modalidad_controller_1.modalidadController.eliminarModalidad);
    }
}
const modalidadRoutes = new ModalidadRoutes();
exports.default = modalidadRoutes.router;
