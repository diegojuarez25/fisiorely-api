import { Router } from 'express';
import { consultasController } from '../controllers/consultas.controller';

class ConsultasRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Obtener todas las consultas
        this.router.get('/', consultasController.obtenerConsultas);
        
        // Obtener una consulta por su ID
        this.router.get('/:id', consultasController.obtenerConsultaPorId);
        
        // Crear una nueva consulta
        this.router.post('/', consultasController.agregarConsulta);
        
        // Actualizar una consulta existente
        this.router.put('/:id', consultasController.actualizarConsulta);
        
        // Eliminar una consulta por su ID
        this.router.delete('/:id', consultasController.eliminarConsulta);
    }
}

const consultasRoutes = new ConsultasRoutes();
export default consultasRoutes.router;
