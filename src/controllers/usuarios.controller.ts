import { Request, Response } from 'express';
import prisma from '../database/database';
import { utils } from '../utils/utils';

class UsuariosController {
    public async obtenerUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const usuarios = await prisma.usuario.findMany();
            res.status(200).json(usuarios);
        } catch (error:any) {
            res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
        }
    }

    public async obtenerUsuarioPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } });
            if (!usuario) {
                res.status(404).json({ message: 'Usuario no encontrado' });
                return;
            }
            res.status(200).json(usuario);
        } catch (error:any) {
            res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
        }
    }

    public async agregarUsuario(req: Request, res: Response): Promise<void> {
        const { nombre, apellido_paterno, apellido_materno, email, password, rol_id } = req.body;
        try {
            // Hashear la contraseña antes de guardarla
            const hashedPassword = await utils.hashPassword(password);
            const nuevoUsuario = await prisma.usuario.create({
                data: {
                    nombre,
                    apellido_paterno,
                    apellido_materno,
                    email,
                    password: hashedPassword,
                    rol_id,
                    fecha_creacion: new Date(),
                    fecha_actualizacion: new Date()
                }
            });
            res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al crear usuario', error: error.message });
        }
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, apellido_paterno, apellido_materno, email, password, rol_id } = req.body;
        try {
            // Construir los datos de actualización
            const dataToUpdate: any = {
                nombre,
                apellido_paterno,
                apellido_materno,
                email,
                rol_id,
                fecha_actualizacion: new Date()
            };
            // Hashear la nueva contraseña si se proporciona
            if (password) {
                dataToUpdate.password = await utils.hashPassword(password);
            }
            const usuarioActualizado = await prisma.usuario.update({
                where: { id: Number(id) },
                data: dataToUpdate
            });
            res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
        }
    }

    public async eliminarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.usuario.delete({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } catch (error:any) {
            res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
        }
    }
}

export const usuariosController = new UsuariosController();
