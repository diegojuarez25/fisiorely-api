"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    /**
     * @swagger
     * definitions:
     *  User:
     *      type: object
     *      properties:
     *          email:
     *              type: string
     *          password:
     *              type: string
     */
    config() {
        /**
         * @swagger
         * /api/auth:
         *  post:
         *      tags: ["Credenciales"]
         *      summary: Log In
         *      description: Inicio de sesión del usuario
         *      produces:
         *          - application/json
         *      parameters:
         *          - in: body
         *            name: Credentials
         *            description: Usuario y contraseña del usuario
         *            schema:
         *              $ref: '#/definitions/User'
         *            required: true
         *      responses:
         *          200:
         *              description: Exitoso
         *          400:
         *              description: Solicitud incorrecta
         *          404:
         *              description: Usuario no encontrado o contraseña incorrecta
         *          500:
         *              description: Error interno del servidor
         */
        this.router.post('/', auth_controller_1.authController.iniciarSesion);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
