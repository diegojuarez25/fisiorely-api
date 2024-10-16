import { Request, Response } from 'express';
import prisma from '../database/database';

class PacientesRController {
    public async obtenerPacientes(req: Request, res: Response): Promise<void> {
        try {
            const pacientes = await prisma.paciente.findMany({ orderBy: {
                nombre: 'asc'
            }});
            res.status(200).json(pacientes);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener pacientes', error: error.message });
            
        }
    }

    public async obtenerPacientePorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const paciente = await prisma.paciente.findUnique({ where: { id: Number(id) } });
            if (!paciente) {
                res.status(404).json({ message: 'Paciente no encontrado' });
                return;
            }
            res.status(200).json(paciente);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener paciente', error: error.message });
        }
    }

    public async agregarPaciente(req: Request, res: Response): Promise<void> {
        const { nombre, apellido_paterno, apellido_materno, telefono, edad, estado, modalidad_id } = req.body;
        try {
            const nuevoPaciente = await prisma.paciente.create({
                data: {
                    nombre,
                    apellido_paterno,
                    apellido_materno,
                    telefono,
                    edad,
                    estado,
                    fecha_creacion: new Date(),
                    modalidad_id: modalidad_id
                }
            });
            res.status(201).json({ message: 'Paciente creado exitosamente', paciente: nuevoPaciente });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al crear paciente', error: error.message });
        }
    }

    public async actualizarPaciente(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { nombre, apellido_paterno, apellido_materno, telefono, edad, estado, modalidad_id } = req.body;
        try {
            const pacienteActualizado = await prisma.paciente.update({
                where: { id: Number(id) },
                data: {
                    nombre,
                    apellido_paterno,
                    apellido_materno,
                    telefono,
                    edad,
                    estado,
                    modalidad_id
                }
            });
            res.status(200).json({ message: 'Paciente actualizado exitosamente', paciente: pacienteActualizado });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar paciente', error: error.message });
        }
    }

    public async eliminarPaciente(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.paciente.delete({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Paciente eliminado exitosamente' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al eliminar paciente', error: error.message });
        }
    }
}

export const pacientesController = new PacientesRController();
