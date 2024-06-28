import { Request, Response } from 'express';
import prisma from '../database/database';

class ModalidadController {
    public async obtenerModalidades(req: Request, res: Response): Promise<void> {
        try {
            const modalidades = await prisma.modalidad.findMany();
            res.status(200).json(modalidades);
        } catch (error:any) {
            res.status(500).json({ message: 'Error al obtener modalidades', error: error.message });
        }
    }

    public async obtenerModalidadPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const modalidad = await prisma.modalidad.findUnique({ where: { id: Number(id) } });
            if (!modalidad) {
                res.status(404).json({ message: 'Modalidad no encontrada' });
                return;
            }
            res.status(200).json(modalidad);
        } catch (error:any) {
            res.status(500).json({ message: 'Error al obtener modalidad', error: error.message });
        }
    }

    public async agregarModalidad(req: Request, res: Response): Promise<void> {
        const { descripcion } = req.body;
        try {
            const nuevaModalidad = await prisma.modalidad.create({
                data: {
                    descripcion,
                }
            });
            res.status(201).json({ message: 'Modalidad creada exitosamente', modalidad: nuevaModalidad });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al crear modalidad', error: error.message });
        }
    }

    public async actualizarModalidad(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { descripcion } = req.body;
        try {
            const modalidadActualizada = await prisma.modalidad.update({
                where: { id: Number(id) },
                data: {
                    descripcion,
                }
            });
            res.status(200).json({ message: 'Modalidad actualizada exitosamente', modalidad: modalidadActualizada });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al actualizar modalidad', error: error.message });
        }
    }

    public async eliminarModalidad(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.modalidad.delete({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Modalidad eliminada exitosamente' });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al eliminar modalidad', error: error.message });
        }
    }
}

export const modalidadController = new ModalidadController();
