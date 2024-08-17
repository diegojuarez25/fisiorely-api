import { Router } from 'express';
import { gastosController } from '../controllers/gasto.controller';

class GastosRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Obtener todos los gastos
        this.router.get('/', gastosController.obtenerGastos);
        
        // Obtener un gasto por su ID
        this.router.get('/:id', gastosController.obtenerGastoPorId);
        
        // Crear un nuevo gasto
        this.router.post('/', gastosController.agregarGasto);
        
        // Actualizar un gasto existente
        this.router.put('/:id', gastosController.actualizarGasto);
        
        // Eliminar un gasto por su ID
        this.router.delete('/:id', gastosController.eliminarGasto);
    }
}

const gastosRoutes = new GastosRoutes();
export default gastosRoutes.router;
