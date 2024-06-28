"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const api_docs_1 = __importDefault(require("./routes/api.docs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const roles_routes_1 = __importDefault(require("./routes/roles.routes"));
const ingresos_routes_1 = __importDefault(require("./routes/ingresos.routes"));
const gasto_routes_1 = __importDefault(require("./routes/gasto.routes"));
const corteCaja_routes_1 = __importDefault(require("./routes/corteCaja.routes"));
const pacientes_routes_1 = __importDefault(require("./routes/pacientes.routes"));
const tipoIngreso_routes_1 = __importDefault(require("./routes/tipoIngreso.routes"));
const modalidad_routes_1 = __importDefault(require("./routes/modalidad.routes"));
const formaPago_routes_1 = __importDefault(require("./routes/formaPago.routes"));
const tipoConsulta_routes_1 = __importDefault(require("./routes/tipoConsulta.routes"));
const consultas_routes_1 = __importDefault(require("./routes/consultas.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        // Configuración del puerto para el servidor
        this.app.set("port", 3000);
        // Muestra las peticiones en consola
        this.app.use((0, morgan_1.default)("dev"));
        // Puertos de conexión de la API
        this.app.use((0, cors_1.default)());
        // Solo se permiten peticiones en formato JSON
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        // Rutas para la autenticación
        this.app.use("/api/auth", auth_routes_1.default);
        // Rutas para la gestión de usuarios
        this.app.use('/api/usuarios', usuarios_routes_1.default);
        // Rutas para la gestión de roles
        this.app.use("/api/roles", roles_routes_1.default);
        // Rutas para la gestión de ingresos
        this.app.use('/api/ingresos', ingresos_routes_1.default);
        // Rutas para la gestión de gastos
        this.app.use('/api/gastos', gasto_routes_1.default);
        // Rutas para la gestión de el corte de caja
        this.app.use("/api/corte-caja", corteCaja_routes_1.default);
        // Rutas para la gestión de pacientes
        this.app.use("/api/pacientes", pacientes_routes_1.default);
        // Rutas para la documentación tipo de ingreso
        this.app.use('/api/tipoIngreso', tipoIngreso_routes_1.default);
        // Rutas para la documentación de modalidas
        this.app.use('/api/modalidad', modalidad_routes_1.default);
        // Rutas para la documentación de la forma de pago
        this.app.use('/api/formaPago', formaPago_routes_1.default);
        // Rutas para la documentación de la forma de pago
        this.app.use('/api/consultas', consultas_routes_1.default);
        // Rutas para la documentación de los tipos de consulta
        this.app.use('/api/tipoConsulta', tipoConsulta_routes_1.default);
        // Rutas para la documentación Swagger
        this.app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(api_docs_1.default));
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
