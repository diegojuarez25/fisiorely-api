import { Request, Response } from 'express';
import prisma from '../database/database';
import moment from 'moment';

class IngresosController {
    public async obtenerIngresos(req: Request, res: Response): Promise<void> {
        try {
            const ingresos = await prisma.ingreso.findMany({
                include: {
                    tipo_ingreso: true,
                    forma_pago: true,
                    modalidad: true,
                    paciente: true // Incluir los datos del paciente
                }
            });
            res.status(200).json(ingresos);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener ingresos', error: error.message });
        }
    }

    public async obtenerIngresoPorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const ingreso = await prisma.ingreso.findUnique({
                where: { id: Number(id) },
                include: {
                    tipo_ingreso: true,
                    forma_pago: true,
                    modalidad: true,
                    paciente: true // Incluir los datos del paciente
                }
            });
            if (!ingreso) {
                res.status(404).json({ message: 'Ingreso no encontrado' });
                return;
            }
            res.status(200).json(ingreso);
        } catch (error: any) {
            res.status(500).json({ message: 'Error al obtener ingreso', error: error.message });
        }
    }

    public async agregarIngreso(req: Request, res: Response): Promise<void> {
        const { tipo_ingreso_id, fecha_inicio, fecha_fin, paciente_id, forma_pago_id, monto, persona_que_atendio, modalidad_id } = req.body;
        try {
          const nuevoIngreso = await prisma.ingreso.create({
            data: {
              tipo_ingreso_id,
              fecha_inicio: moment(fecha_inicio).toDate(), // Parsear la fecha a objeto Date
              fecha_fin: moment(fecha_fin).toDate(), // Parsear la fecha a objeto Date
              paciente_id,
              forma_pago_id,
              monto,
              persona_que_atendio,
              modalidad_id,
              fecha_creacion: new Date()
            }, 
            include: {
              tipo_ingreso: true,
              forma_pago: true,
              modalidad: true,
              paciente: true // Incluir los datos del paciente
            }
          });
          res.status(201).json({ message: 'Ingreso creado exitosamente', ingreso: nuevoIngreso });
        } catch (error: any) {
          res.status(500).json({ message: 'Error al crear ingreso', error: error.message });
        }
      }
      

    public async actualizarIngreso(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { tipo_ingreso_id, fecha_inicio, fecha_fin, paciente_id, forma_pago_id, monto, persona_que_atendio, modalidad_id } = req.body;
        try {
            const ingresoActualizado = await prisma.ingreso.update({
                where: { id: Number(id) },
                data: {
                    tipo_ingreso_id,
                    fecha_inicio: moment(fecha_inicio).toDate(), // Parsear la fecha a objeto Date
                    fecha_fin: moment(fecha_fin).toDate(), // Parsear la fecha a objeto Date
                    paciente_id,
                    forma_pago_id,
                    monto,
                    persona_que_atendio,
                    modalidad_id
                },
                include: {
                    tipo_ingreso: true,
                    forma_pago: true,
                    modalidad: true,
                    paciente: true // Incluir los datos del paciente
                }
            });
            res.status(200).json({ message: 'Ingreso actualizado exitosamente', ingreso: ingresoActualizado });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al actualizar ingreso', error: error.message });
        }
    }

    public async eliminarIngreso(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            await prisma.ingreso.delete({ where: { id: Number(id) } });
            res.status(200).json({ message: 'Ingreso eliminado exitosamente' });
        } catch (error: any) {
            res.status(500).json({ message: 'Error al eliminar ingreso', error: error.message });
        }
    }
}

export const ingresosController = new IngresosController();
