import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import usuariosRoutes from './routes/usuarios.routes';
import swaggerDocs from './routes/api.docs';
import swaggerIU from 'swagger-ui-express';
import rolesRoutes from './routes/roles.routes';
import ingresosRoutes from './routes/ingresos.routes';
import gastoRoutes from './routes/gasto.routes';
import corteCajaRoutes from './routes/corteCaja.routes';
import pacientesRoutes from './routes/pacientes.routes';
import tipoIngresoRoutes from './routes/tipoIngreso.routes';
import modalidadRoutes from './routes/modalidad.routes';
import formaPagoRoutes from './routes/formaPago.routes';
import tipoConsultaRoutes from './routes/tipoConsulta.routes';
import consultasRoutes from './routes/consultas.routes';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        // Configuración del puerto para el servidor
        this.app.set("port", 3000);
        
        // Muestra las peticiones en consola
        this.app.use(morgan("dev"));

        // Puertos de conexión de la API
        this.app.use(cors());

        // Solo se permiten peticiones en formato JSON
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        // Rutas para la autenticación
        this.app.use("/api/auth", authRoutes);

        // Rutas para la gestión de usuarios
        this.app.use('/api/usuarios', usuariosRoutes);

        // Rutas para la gestión de roles
        this.app.use("/api/roles", rolesRoutes);

        // Rutas para la gestión de ingresos
        this.app.use('/api/ingresos', ingresosRoutes);

        // Rutas para la gestión de gastos
        this.app.use('/api/gastos', gastoRoutes);
        
        // Rutas para la gestión de el corte de caja
        this.app.use("/api/corte-caja", corteCajaRoutes);

        // Rutas para la gestión de pacientes
        this.app.use("/api/pacientes", pacientesRoutes);

        // Rutas para la documentación tipo de ingreso
       this.app.use('/api/tipoIngreso', tipoIngresoRoutes);

       // Rutas para la documentación de modalidas
       this.app.use('/api/modalidad', modalidadRoutes);
    
       // Rutas para la documentación de la forma de pago
       this.app.use('/api/formaPago', formaPagoRoutes);

              // Rutas para la documentación de la forma de pago
        this.app.use('/api/consultas', consultasRoutes);

       // Rutas para la documentación de los tipos de consulta
       this.app.use('/api/tipoConsulta', tipoConsultaRoutes);

        // Rutas para la documentación Swagger
        this.app.use("/api/docs", swaggerIU.serve, swaggerIU.setup(swaggerDocs));
    }

    start(): void {
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }
}

const server = new Server();
server.start();
