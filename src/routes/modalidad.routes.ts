import { Router } from 'express';
import { modalidadController } from '../controllers/modalidad.controller';

class ModalidadRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Obtener todas las modalidades
        this.router.get('/', modalidadController.obtenerModalidades);
        
        // Obtener una modalidad por su ID
        this.router.get('/:id', modalidadController.obtenerModalidadPorId);
        
        // Crear una nueva modalidad
        this.router.post('/', modalidadController.agregarModalidad);
        
        // Actualizar una modalidad existente
        this.router.put('/:id', modalidadController.actualizarModalidad);
        
        // Eliminar una modalidad por su ID
        this.router.delete('/:id', modalidadController.eliminarModalidad);
    }
}

const modalidadRoutes = new ModalidadRoutes();
export default modalidadRoutes.router;
