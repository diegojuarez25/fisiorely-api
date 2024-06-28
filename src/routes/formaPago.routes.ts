import { Router } from 'express';
import { formaPagoController } from '../controllers/formaPago.controller';

class FormaPagoRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        // Obtener todas las formas de pago
        this.router.get('/', formaPagoController.obtenerFormasPago);
        
        // Obtener una forma de pago por su ID
        this.router.get('/:id', formaPagoController.obtenerFormaPagoPorId);
        
        // Crear una nueva forma de pago
        this.router.post('/', formaPagoController.agregarFormaPago);
        
        // Actualizar una forma de pago existente
        this.router.put('/:id', formaPagoController.actualizarFormaPago);
        
        // Eliminar una forma de pago por su ID
        this.router.delete('/:id', formaPagoController.eliminarFormaPago);
    }
}

const formaPagoRoutes = new FormaPagoRoutes();
export default formaPagoRoutes.router;
