import { Router } from 'express';
import { rolesController } from '../controllers/roles.controller';

class RolesRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Obtener todos los roles
        this.router.get('/', rolesController.obtenerRoles);
        
        // Obtener un rol por su ID
        this.router.get('/:id', rolesController.obtenerRolPorId);
        
        // Crear un nuevo rol
        this.router.post('/', rolesController.agregarRol);
        
        // Actualizar un rol existente
        this.router.put('/:id', rolesController.actualizarRol);
        
        // Eliminar un rol por su ID
        this.router.delete('/:id', rolesController.eliminarRol);
    }
}

const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
