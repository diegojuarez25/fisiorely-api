import { Router } from 'express';
import { usuariosController } from '../controllers/usuarios.controller';

class UsuariosRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Obtener todos los usuarios
        this.router.get('/', usuariosController.obtenerUsuarios);
        
        // Obtener un usuario por su ID
        this.router.get('/:id', usuariosController.obtenerUsuarioPorId);
        
        // Crear un nuevo usuario
        this.router.post('/', usuariosController.agregarUsuario);
        
        // Actualizar un usuario existente
        this.router.put('/:id', usuariosController.actualizarUsuario);
        
        // Eliminar un usuario por su ID
        this.router.delete('/:id', usuariosController.eliminarUsuario);
    }
}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;
