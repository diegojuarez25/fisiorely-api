import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import swaggerDocs from './routes/api.docs';
import swaggerIU from 'swagger-ui-express';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        // configuración del puerto para el servidor
        this.app.set("port", 3000);
        
        // muestra las peticiones en consola
        this.app.use(morgan("dev"));

        // puertos de conexión de la API
        this.app.use(cors());

        // solo se pertimen peticiones en formato JSON
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use("/api/auth", authRoutes);
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