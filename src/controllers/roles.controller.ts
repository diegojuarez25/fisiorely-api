import { Request, Response } from 'express';
import prisma from '../database/database';

class RolesController {
    public async obtenerRoles(req: Request, res: Response): Promise<void> {
        try {
            const roles = await prisma.role.findMany();
            res.status(200).json(roles);
        } catch (error:any) {
            res.status(500).json({ message: 'Error al obtener roles', error: error.message });
        }
    }

    public async obtenerRolPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const rol = await prisma.role.findUnique({ where: { id: Number(id) } });
            if (!rol) {
                res.status(404).json({ message: 'Rol no encontrado' });
                return;
            }
            res.status(200).json(rol);
        } catch (error:any) {
            res.status(500).json({ message: 'Error al obtener rol', error: error.message });
        }
    }

    public async agregarRol(req: Request, res: Response): Promise<void> {
        const { nombre, descripcion } = req.body;
        try {
            const nuevoRol = await prisma.role.create({
                data: {
                    nombre,
                    descripcion,
                    fecha_creacion: new Date()
                }
            });
            res.status(201).json({ message: 'Rol creado exitosamente', rol: nuevoRol });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al crear rol', error: error.message });
        }
    }

    public async actualizarRol(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        try {
            const rolActualizado = await prisma.role.update({
                where: { id: Number(id) },
                data: {
                    nombre,
                    descripcion,
                }
            });
            res.status(200).json({ message: 'Rol actualizado exitosamente', rol: rolActualizado });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al actualizar rol', error: error.message });
        }
    }

    public async eliminarRol(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.role.delete({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Rol eliminado exitosamente' });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al eliminar rol', error: error.message });
        }
    }
}

export const rolesController = new RolesController();
