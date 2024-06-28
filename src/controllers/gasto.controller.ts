import { Request, Response } from 'express';
import prisma from '../database/database';

class GastosController {
    public async obtenerGastos(req: Request, res: Response): Promise<void> {
        try {
            const gastos = await prisma.gasto.findMany({
                include: {
                    forma_pago: true, // Incluir los datos de la forma de pago
                },
            });
            res.status(200).json(gastos);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener gastos', error: error.message });
        }
    }

    public async obtenerGastoPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const gasto = await prisma.gasto.findUnique({
                where: { id: Number(id) },
                include: {
                    forma_pago: true, // Incluir los datos de la forma de pago
                },
            });
            if (!gasto) {
                res.status(404).json({ message: 'Gasto no encontrado' });
                return;
            }
            res.status(200).json(gasto);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener gasto', error: error.message });
        }
    }

    public async agregarGasto(req: Request, res: Response): Promise<void> {
        const { concepto, monto, forma_pago_id, fecha } = req.body;
        try {
            const nuevoGasto = await prisma.gasto.create({
                data: {
                    concepto,
                    monto,
                    forma_pago_id,
                    fecha,
                    fecha_creacion: new Date(),
                    fecha_actualizacion: new Date()
                }
            });
            res.status(201).json({ message: 'Gasto creado exitosamente', gasto: nuevoGasto });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al crear gasto', error: error.message });
        }
    }

    public async actualizarGasto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { concepto, monto, forma_pago_id, fecha } = req.body;
        try {
            const gastoActualizado = await prisma.gasto.update({
                where: { id: Number(id) },
                data: {
                    concepto,
                    monto,
                    forma_pago_id,
                    fecha,
                    fecha_actualizacion: new Date()
                }
            });
            res.status(200).json({ message: 'Gasto actualizado exitosamente', gasto: gastoActualizado });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar gasto', error: error.message });
        }
    }

    public async eliminarGasto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.gasto.delete({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Gasto eliminado exitosamente' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al eliminar gasto', error: error.message });
        }
    }
}

export const gastosController = new GastosController();
