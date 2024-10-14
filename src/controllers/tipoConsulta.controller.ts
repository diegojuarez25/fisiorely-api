import { Request, Response } from 'express';
import prisma from '../database/database';

class TipoConsultaController {
    public async obtenerTiposConsulta(req: Request, res: Response): Promise<void> {
        try {
            const tiposConsulta = await prisma.tipoConsulta.findMany();
            res.status(200).json(tiposConsulta);
        } catch (error:any) {
            res.status(500).json({ message: 'Error al obtener tipos de consulta', error: error.message });
        }
    }

    public async obtenerTipoConsultaPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const tipoConsulta = await prisma.tipoConsulta.findUnique({ where: { id: Number(id) } });
            if (!tipoConsulta) {
                res.status(404).json({ message: 'Tipo de consulta no encontrado' });
                return;
            }
            res.status(200).json(tipoConsulta);
        } catch (error:any) {
            res.status(500).json({ message: 'Error al obtener tipo de consulta', error: error.message });
        }
    }

    public async agregarTipoConsulta(req: Request, res: Response): Promise<void> {
        const { descripcion } = req.body;
        try {
            const nuevoTipoConsulta = await prisma.tipoConsulta.create({
                data: {
                    descripcion,
                }
            });
            res.status(201).json({ message: 'Tipo de consulta creado exitosamente', tipoConsulta: nuevoTipoConsulta });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al crear tipo de consulta', error: error.message });
        }
    }

    public async actualizarTipoConsulta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { descripcion } = req.body;
        try {
            const tipoConsultaActualizado = await prisma.tipoConsulta.update({
                where: { id: Number(id) },
                data: {
                    descripcion,
                }
            });
            res.status(200).json({ message: 'Tipo de consulta actualizado exitosamente', tipoConsulta: tipoConsultaActualizado });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al actualizar tipo de consulta', error: error.message });
        }
    }

    public async eliminarTipoConsulta(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.tipoConsulta.delete({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Tipo de consulta eliminado exitosamente' });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al eliminar tipo de consulta', error: error.message });
        }
    }
}

export const tipoConsultaController = new TipoConsultaController();
