import { Router } from 'express';
import { tipoConsultaController } from '../controllers/tipoConsulta.controller';

class TipoConsultaRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Obtener todos los tipos de consulta
        this.router.get('/', tipoConsultaController.obtenerTiposConsulta);
        
        // Obtener un tipo de consulta por su ID
        this.router.get('/:id', tipoConsultaController.obtenerTipoConsultaPorId);
        
        // Crear un nuevo tipo de consulta
        this.router.post('/', tipoConsultaController.agregarTipoConsulta);
        
        // Actualizar un tipo de consulta existente
        this.router.put('/:id', tipoConsultaController.actualizarTipoConsulta);
        
        // Eliminar un tipo de consulta por su ID
        this.router.delete('/:id', tipoConsultaController.eliminarTipoConsulta);
    }
}

const tipoConsultaRoutes = new TipoConsultaRoutes();
export default tipoConsultaRoutes.router;
