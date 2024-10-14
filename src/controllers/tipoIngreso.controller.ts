import { Request, Response } from 'express';
import prisma from '../database/database'; // Asegúrate de que el path es correcto

class TipoIngresoController {
    public async obtenerTiposIngreso(req: Request, res: Response): Promise<void> {
        try {
            const tiposIngreso = await prisma.tipoIngreso.findMany();
            res.status(200).json(tiposIngreso);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener tipos de ingreso', error: error.message });
        }
    }

    public async obtenerTipoIngresoPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const tipoIngreso = await prisma.tipoIngreso.findUnique({ where: { id: Number(id) } });
            if (!tipoIngreso) {
                res.status(404).json({ message: 'Tipo de ingreso no encontrado' });
                return;
            }
            res.status(200).json(tipoIngreso);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener tipo de ingreso', error: error.message });
        }
    }

    public async agregarTipoIngreso(req: Request, res: Response): Promise<void> {
        const { descripcion } = req.body;
        try {
            const nuevoTipoIngreso = await prisma.tipoIngreso.create({
                data: { descripcion }
            });
            res.status(201).json({ message: 'Tipo de ingreso creado exitosamente', tipoIngreso: nuevoTipoIngreso });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al crear tipo de ingreso', error: error.message });
        }
    }

    public async actualizarTipoIngreso(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { descripcion } = req.body;
        try {
            const tipoIngresoActualizado = await prisma.tipoIngreso.update({
                where: { id: Number(id) },
                data: { descripcion }
            });
            res.status(200).json({ message: 'Tipo de ingreso actualizado exitosamente', tipoIngreso: tipoIngresoActualizado });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar tipo de ingreso', error: error.message });
        }
    }

    public async eliminarTipoIngreso(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.tipoIngreso.delete({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Tipo de ingreso eliminado exitosamente' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al eliminar tipo de ingreso', error: error.message });
        }
    }
}

export const tipoIngresoController = new TipoIngresoController();
