import { Request, Response } from 'express';
import prisma from '../database/database';

class FormaPagoController {
    public async obtenerFormasPago(req: Request, res: Response): Promise<void> {
        try {
            const formasPago = await prisma.formaPago.findMany();
            res.status(200).json(formasPago);
        } catch (error:any) {
            res.status(500).json({ message: 'Error al obtener formas de pago', error: error.message });
        }
    }

    public async obtenerFormaPagoPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const formaPago = await prisma.formaPago.findUnique({ where: { id: Number(id) } });
            if (!formaPago) {
                res.status(404).json({ message: 'Forma de pago no encontrada' });
                return;
            }
            res.status(200).json(formaPago);
        } catch (error:any) {
            res.status(500).json({ message: 'Error al obtener forma de pago', error: error.message });
        }
    }

    public async agregarFormaPago(req: Request, res: Response): Promise<void> {
        const { descripcion } = req.body;
        try {
            const nuevaFormaPago = await prisma.formaPago.create({
                data: {
                    descripcion,
                }
            });
            res.status(201).json({ message: 'Forma de pago creada exitosamente', formaPago: nuevaFormaPago });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al crear forma de pago', error: error.message });
        }
    }

    public async actualizarFormaPago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { descripcion } = req.body;
        try {
            const formaPagoActualizada = await prisma.formaPago.update({
                where: { id: Number(id) },
                data: {
                    descripcion,
                }
            });
            res.status(200).json({ message: 'Forma de pago actualizada exitosamente', formaPago: formaPagoActualizada });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al actualizar forma de pago', error: error.message });
        }
    }

    public async eliminarFormaPago(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.formaPago.delete({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Forma de pago eliminada exitosamente' });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al eliminar forma de pago', error: error.message });
        }
    }
}

export const formaPagoController = new FormaPagoController();
