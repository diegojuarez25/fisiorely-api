import { Router } from 'express';
import { tipoIngresoController } from '../controllers/tipoIngreso.controller';

class TipoIngresoRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Obtener todos los tipos de ingreso
        this.router.get('/', tipoIngresoController.obtenerTiposIngreso);
        
        // Obtener un tipo de ingreso por su ID
        this.router.get('/:id', tipoIngresoController.obtenerTipoIngresoPorId);
        
        // Crear un nuevo tipo de ingreso
        this.router.post('/', tipoIngresoController.agregarTipoIngreso);
        
        // Actualizar un tipo de ingreso existente
        this.router.put('/:id', tipoIngresoController.actualizarTipoIngreso);
        
        // Eliminar un tipo de ingreso por su ID
        this.router.delete('/:id', tipoIngresoController.eliminarTipoIngreso);
    }
}

const tipoIngresoRoutes = new TipoIngresoRoutes();
export default tipoIngresoRoutes.router;
