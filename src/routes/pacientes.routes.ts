import { Router } from 'express';
import { pacientesController } from '../controllers/pacientes.controller';

class PacientesRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Obtener todos los pacientes
        this.router.get('/', pacientesController.obtenerPacientes);
        
        // Obtener un paciente por su ID
        this.router.get('/:id', pacientesController.obtenerPacientePorId);
        
        // Crear un nuevo paciente
        this.router.post('/', pacientesController.agregarPaciente);
        
        // Actualizar un paciente existente
        this.router.put('/:id', pacientesController.actualizarPaciente);
        
        // Eliminar un paciente por su ID
        this.router.delete('/:id', pacientesController.eliminarPaciente);
    }
}

const pacientesRoutes = new PacientesRoutes();
export default pacientesRoutes.router;
