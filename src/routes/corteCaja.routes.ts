import { Router } from 'express';
import { corteCajaController } from '../controllers/corteCaja.controller';

class CorteCajaRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Crear un nuevo corte de caja
        this.router.post('/', corteCajaController.realizarCorteCaja);

        // Obtener todos los cortes de caja
        this.router.get('/', corteCajaController.obtenerCortesCaja);

        // Obtener un corte de caja por su ID
        this.router.get('/:id', corteCajaController.obtenerCorteCajaPorId);

        // Eliminar un corte de caja por su ID
        this.router.delete('/:id', corteCajaController.eliminarCorteCaja);
    }
}

const corteCajaRoutes = new CorteCajaRoutes();
export default corteCajaRoutes.router;
