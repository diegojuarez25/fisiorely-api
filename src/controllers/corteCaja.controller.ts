import { Request, Response } from 'express';
import prisma from '../database/database';

class CorteCajaController {
  // Obtener detalles de ingresos por formas de pago
  public async obtenerDetallesIngresos(req: Request, res: Response): Promise<void> {
    let fechaInicio: string | undefined = req.query.fecha_inicio as string | undefined;
    let fechaFin: string | undefined = req.query.fecha_fin as string | undefined;

    if (!fechaInicio || !fechaFin) {
      res.status(400).json({ message: 'Falta fecha_inicio o fecha_fin en la consulta' });
      return;
    }

    try {
      const ingresos = await prisma.ingreso.findMany({
        where: {
          fecha_creacion: {
            gte: new Date(fechaInicio),
            lte: new Date(fechaFin),
          },
        },
        include: {
          forma_pago: true,
        },
      });

      const detallesIngresos = {
        total: ingresos.reduce((acc, ingreso) => acc + ingreso.monto, 0),
        efectivo: ingresos.filter(i => i.forma_pago.descripcion === 'Efectivo').reduce((acc, ingreso) => acc + ingreso.monto, 0),
        transferencia: ingresos.filter(i => i.forma_pago.descripcion === 'Transferencia').reduce((acc, ingreso) => acc + ingreso.monto, 0),
        tarjeta: ingresos.filter(i => i.forma_pago.descripcion === 'Tarjeta').reduce((acc, ingreso) => acc + ingreso.monto, 0),
      };

      res.status(200).json(detallesIngresos);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener detalles de ingresos', error: error.message });
    }
  }

  // Obtener detalles de gastos por formas de pago
  public async obtenerDetallesGastos(req: Request, res: Response): Promise<void> {
    let fechaInicio: string | undefined = req.query.fecha_inicio as string | undefined;
    let fechaFin: string | undefined = req.query.fecha_fin as string | undefined;

    if (!fechaInicio || !fechaFin) {
      res.status(400).json({ message: 'Falta fecha_inicio o fecha_fin en la consulta' });
      return;
    }

    try {
      const gastos = await prisma.gasto.findMany({
        where: {
          fecha: {
            gte: new Date(fechaInicio),
            lte: new Date(fechaFin),
          },
        },
        include: {
          forma_pago: true,
        },
      });

      const detallesGastos = {
        total: gastos.reduce((acc, gasto) => acc + gasto.monto, 0),
        efectivo: gastos.filter(g => g.forma_pago.descripcion === 'Efectivo').reduce((acc, gasto) => acc + gasto.monto, 0),
        transferencia: gastos.filter(g => g.forma_pago.descripcion === 'Transferencia').reduce((acc, gasto) => acc + gasto.monto, 0),
        tarjeta: gastos.filter(g => g.forma_pago.descripcion === 'Tarjeta').reduce((acc, gasto) => acc + gasto.monto, 0),
      };

      res.status(200).json(detallesGastos);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener detalles de gastos', error: error.message });
    }
  }

  // Realizar corte de caja
  public async realizarCorteCaja(req: Request, res: Response): Promise<void> {
    const { fecha_inicio, fecha_fin, usuario_id } = req.body;

    if (!fecha_inicio || !fecha_fin || !usuario_id) {
      res.status(400).json({ message: 'Falta fecha_inicio, fecha_fin o usuario_id en la solicitud' });
      return;
    }

    try {
      // Obtener ingresos por forma de pago
      const ingresos = await prisma.ingreso.findMany({
        where: {
          fecha_creacion: {
            gte: new Date(fecha_inicio),
            lte: new Date(fecha_fin),
          },
        },
        include: {
          forma_pago: true,
        },
      });

      // Obtener gastos por forma de pago
      const gastos = await prisma.gasto.findMany({
        where: {
          fecha: {
            gte: new Date(fecha_inicio),
            lte: new Date(fecha_fin),
          },
        },
        include: {
          forma_pago: true,
        },
      });

      // Calcular totales de ingresos y gastos
      const totalIngresos = ingresos.reduce((acc, ingreso) => acc + ingreso.monto, 0);
      const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);

      // Calcular ingresos por tipo de pago
      let efectivoIngresos = 0;
      let transferenciaIngresos = 0;
      let tarjetaIngresos = 0;

      ingresos.forEach(ingreso => {
        switch (ingreso.forma_pago.descripcion) {
          case 'Efectivo':
            efectivoIngresos += ingreso.monto;
            break;
          case 'Transferencia':
            transferenciaIngresos += ingreso.monto;
            break;
          case 'Tarjeta':
            tarjetaIngresos += ingreso.monto;
            break;
          default:
            break;
        }
      });

      // Calcular gastos por tipo de pago
      let efectivoGastos = 0;
      let transferenciaGastos = 0;
      let tarjetaGastos = 0;

      gastos.forEach(gasto => {
        switch (gasto.forma_pago.descripcion) {
          case 'Efectivo':
            efectivoGastos += gasto.monto;
            break;
          case 'Transferencia':
            transferenciaGastos += gasto.monto;
            break;
          case 'Tarjeta':
            tarjetaGastos += gasto.monto;
            break;
          default:
            break;
        }
      });

      // Crear el registro de corte de caja
      const nuevoCorte = await prisma.corteCaja.create({
        data: {
          fecha_inicio: new Date(fecha_inicio),
          fecha_fin: new Date(fecha_fin),
          total_ingresos: totalIngresos,
          total_gastos: totalGastos,
          efectivo: efectivoIngresos,
          transferencia: transferenciaIngresos,
          tarjeta: tarjetaIngresos,
          efectivo_gastos: efectivoGastos,
          transferencia_gastos: transferenciaGastos,
          tarjeta_gastos: tarjetaGastos,
          usuario: {
            connect: { id: parseInt(usuario_id) },
          },
        },
        include: {
          usuario: {
            select: {
              nombre: true,
              apellido_paterno: true,
              apellido_materno: true,
            },
          },
        },
      });

      // Preparar respuesta para enviar al cliente
      const response = {
        id: nuevoCorte.id,
        fecha_inicio: nuevoCorte.fecha_inicio,
        fecha_fin: nuevoCorte.fecha_fin,
        total_ingresos: nuevoCorte.total_ingresos,
        total_gastos: nuevoCorte.total_gastos,
        efectivo: nuevoCorte.efectivo,
        transferencia: nuevoCorte.transferencia,
        tarjeta: nuevoCorte.tarjeta,
        efectivo_gastos: nuevoCorte.efectivo_gastos,
        transferencia_gastos: nuevoCorte.transferencia_gastos,
        tarjeta_gastos: nuevoCorte.tarjeta_gastos,
        fecha_creacion: nuevoCorte.fecha_creacion,
        fecha_actualizacion: nuevoCorte.fecha_actualizacion,
        usuario: {
          nombre: nuevoCorte.usuario?.nombre ?? '',
          apellido_paterno: nuevoCorte.usuario?.apellido_paterno ?? '',
          apellido_materno: nuevoCorte.usuario?.apellido_materno ?? '',
        },
      };

      res.status(201).json(response);
    } catch (error: any) {
      console.error('Error al realizar corte de caja:', error);
      res.status(500).json({ message: 'Error al realizar corte de caja', error: error.message });
    }
  }


  // Método para obtener todos los cortes de caja
  public async obtenerCortesCaja(req: Request, res: Response): Promise<void> {
    try {
      const cortesCaja = await prisma.corteCaja.findMany({
        include: {
          usuario: {
            select: {
              nombre: true,
              apellido_paterno: true,
              apellido_materno: true,
            },
          },
        },
        orderBy: {
          fecha_inicio: 'desc', // Ordenar por fecha de inicio descendente
        },
      });

      // Mapear los datos para estructurar la respuesta según el formato deseado
      const response = cortesCaja.map(corte => ({
        id: corte.id,
        fecha_inicio: corte.fecha_inicio,
        fecha_fin: corte.fecha_fin,
        total_ingresos: corte.total_ingresos,
        total_gastos: corte.total_gastos,
        efectivo: corte.efectivo,
        transferencia: corte.transferencia,
        tarjeta: corte.tarjeta,
        efectivo_gastos: corte.efectivo_gastos,
        transferencia_gastos: corte.transferencia_gastos,
        tarjeta_gastos: corte.tarjeta_gastos,
        fecha_creacion: corte.fecha_creacion,
        fecha_actualizacion: corte.fecha_actualizacion,
        usuario: {
          nombre: corte.usuario?.nombre ?? '',
          apellido_paterno: corte.usuario?.apellido_paterno ?? '',
          apellido_materno: corte.usuario?.apellido_materno ?? '',
        },
      }));

      res.status(200).json(response);
    } catch (error: any) {
      console.error('Error al obtener cortes de caja:', error);
      res.status(500).json({ message: 'Error al obtener cortes de caja', error: error.message });
    }
  }

  // Método para obtener un corte de caja por su ID
  public async obtenerCorteCajaPorId(req: Request, res: Response): Promise<void> {
    const corteCajaId = parseInt(req.params.id);

    if (!corteCajaId || isNaN(corteCajaId)) {
      res.status(400).json({ message: 'El ID del corte de caja proporcionado no es válido' });
      return;
    }

    try {
      const corteCaja = await prisma.corteCaja.findUnique({
        where: {
          id: corteCajaId,
        },
        include: {
          usuario: {
            select: {
              nombre: true,
              apellido_paterno: true,
              apellido_materno: true,
            },
          },
        },
      });

      if (!corteCaja) {
        res.status(404).json({ message: `No se encontró el corte de caja con ID ${corteCajaId}` });
        return;
      }

      const response = {
        id: corteCaja.id,
        fecha_inicio: corteCaja.fecha_inicio,
        fecha_fin: corteCaja.fecha_fin,
        total_ingresos: corteCaja.total_ingresos,
        total_gastos: corteCaja.total_gastos,
        efectivo: corteCaja.efectivo,
        transferencia: corteCaja.transferencia,
        tarjeta: corteCaja.tarjeta,
        efectivo_gastos: corteCaja.efectivo_gastos,
        transferencia_gastos: corteCaja.transferencia_gastos,
        tarjeta_gastos: corteCaja.tarjeta_gastos,
        fecha_creacion: corteCaja.fecha_creacion,
        fecha_actualizacion: corteCaja.fecha_actualizacion,
        usuario: {
          nombre: corteCaja.usuario?.nombre ?? '',
          apellido_paterno: corteCaja.usuario?.apellido_paterno ?? '',
          apellido_materno: corteCaja.usuario?.apellido_materno ?? '',
        },
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.error(`Error al obtener corte de caja con ID ${corteCajaId}:`, error);
      res.status(500).json({ message: `Error al obtener corte de caja con ID ${corteCajaId}`, error: error.message });
    }
  }

public async eliminarCorteCaja(req: Request, res: Response): Promise<void> {
    const corteCajaId = parseInt(req.params.id);

    if (!corteCajaId || isNaN(corteCajaId)) {
      res.status(400).json({ message: 'El ID del corte de caja proporcionado no es válido' });
      return;
    }

    try {
      const corteCaja = await prisma.corteCaja.delete({
        where: {
          id: corteCajaId,
        },
      });

      res.status(200).json({ message: `Corte de caja con ID ${corteCajaId} eliminado correctamente` });
    } catch (error: any) {
      console.error(`Error al eliminar corte de caja con ID ${corteCajaId}:`, error);
      res.status(500).json({ message: `Error al eliminar corte de caja con ID ${corteCajaId}`, error: error.message });
    }
  }
}

export const corteCajaController = new CorteCajaController();
