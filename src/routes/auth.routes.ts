import { Router, RouterOptions } from "express";
import { authController } from "../controllers/auth.controller";

class AuthRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    /**
     * @swagger
     * definitions:
     *  User:
     *      type: object
     *      properties:
     *          username:
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
         */
        this.router.post('/', authController.iniciarSesion);
    }

}
const authRoutes = new AuthRoutes();
export default authRoutes.router;