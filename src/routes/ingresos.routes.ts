import { Router } from 'express';
import { ingresosController } from '../controllers/ingresos.controller';

class IngresosRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Obtener todos los ingresos
        this.router.get('/', ingresosController.obtenerIngresos);
        
        // Obtener un ingreso por su ID
        this.router.get('/:id', ingresosController.obtenerIngresoPorId);
        
        // Crear un nuevo ingreso
        this.router.post('/', ingresosController.agregarIngreso);
        
        // Actualizar un ingreso existente
        this.router.put('/:id', ingresosController.actualizarIngreso);
        
        // Eliminar un ingreso por su ID
        this.router.delete('/:id', ingresosController.eliminarIngreso);
    }
}

const ingresosRoutes = new IngresosRoutes();
export default ingresosRoutes.router;