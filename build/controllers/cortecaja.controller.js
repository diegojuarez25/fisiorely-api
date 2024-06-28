"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corteCajaController = void 0;
const database_1 = __importDefault(require("../database/database"));
class CorteCajaController {
    // Obtener detalles de ingresos por formas de pago
    obtenerDetallesIngresos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let fechaInicio = req.query.fecha_inicio;
            let fechaFin = req.query.fecha_fin;
            if (!fechaInicio || !fechaFin) {
                res.status(400).json({ message: 'Falta fecha_inicio o fecha_fin en la consulta' });
                return;
            }
            try {
                const ingresos = yield database_1.default.ingreso.findMany({
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
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener detalles de ingresos', error: error.message });
            }
        });
    }
    // Obtener detalles de gastos por formas de pago
    obtenerDetallesGastos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let fechaInicio = req.query.fecha_inicio;
            let fechaFin = req.query.fecha_fin;
            if (!fechaInicio || !fechaFin) {
                res.status(400).json({ message: 'Falta fecha_inicio o fecha_fin en la consulta' });
                return;
            }
            try {
                const gastos = yield database_1.default.gasto.findMany({
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
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener detalles de gastos', error: error.message });
            }
        });
    }
    // Realizar corte de caja
    realizarCorteCaja(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const { fecha_inicio, fecha_fin, usuario_id } = req.body;
            if (!fecha_inicio || !fecha_fin || !usuario_id) {
                res.status(400).json({ message: 'Falta fecha_inicio, fecha_fin o usuario_id en la solicitud' });
                return;
            }
            try {
                // Obtener ingresos por forma de pago
                const ingresos = yield database_1.default.ingreso.findMany({
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
                const gastos = yield database_1.default.gasto.findMany({
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
                const nuevoCorte = yield database_1.default.corteCaja.create({
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
                        nombre: (_b = (_a = nuevoCorte.usuario) === null || _a === void 0 ? void 0 : _a.nombre) !== null && _b !== void 0 ? _b : '',
                        apellido_paterno: (_d = (_c = nuevoCorte.usuario) === null || _c === void 0 ? void 0 : _c.apellido_paterno) !== null && _d !== void 0 ? _d : '',
                        apellido_materno: (_f = (_e = nuevoCorte.usuario) === null || _e === void 0 ? void 0 : _e.apellido_materno) !== null && _f !== void 0 ? _f : '',
                    },
                };
                res.status(201).json(response);
            }
            catch (error) {
                console.error('Error al realizar corte de caja:', error);
                res.status(500).json({ message: 'Error al realizar corte de caja', error: error.message });
            }
        });
    }
    // Método para obtener todos los cortes de caja
    obtenerCortesCaja(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cortesCaja = yield database_1.default.corteCaja.findMany({
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
                const response = cortesCaja.map(corte => {
                    var _a, _b, _c, _d, _e, _f;
                    return ({
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
                            nombre: (_b = (_a = corte.usuario) === null || _a === void 0 ? void 0 : _a.nombre) !== null && _b !== void 0 ? _b : '',
                            apellido_paterno: (_d = (_c = corte.usuario) === null || _c === void 0 ? void 0 : _c.apellido_paterno) !== null && _d !== void 0 ? _d : '',
                            apellido_materno: (_f = (_e = corte.usuario) === null || _e === void 0 ? void 0 : _e.apellido_materno) !== null && _f !== void 0 ? _f : '',
                        },
                    });
                });
                res.status(200).json(response);
            }
            catch (error) {
                console.error('Error al obtener cortes de caja:', error);
                res.status(500).json({ message: 'Error al obtener cortes de caja', error: error.message });
            }
        });
    }
    // Método para obtener un corte de caja por su ID
    obtenerCorteCajaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const corteCajaId = parseInt(req.params.id);
            if (!corteCajaId || isNaN(corteCajaId)) {
                res.status(400).json({ message: 'El ID del corte de caja proporcionado no es válido' });
                return;
            }
            try {
                const corteCaja = yield database_1.default.corteCaja.findUnique({
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
                        nombre: (_b = (_a = corteCaja.usuario) === null || _a === void 0 ? void 0 : _a.nombre) !== null && _b !== void 0 ? _b : '',
                        apellido_paterno: (_d = (_c = corteCaja.usuario) === null || _c === void 0 ? void 0 : _c.apellido_paterno) !== null && _d !== void 0 ? _d : '',
                        apellido_materno: (_f = (_e = corteCaja.usuario) === null || _e === void 0 ? void 0 : _e.apellido_materno) !== null && _f !== void 0 ? _f : '',
                    },
                };
                res.status(200).json(response);
            }
            catch (error) {
                console.error(`Error al obtener corte de caja con ID ${corteCajaId}:`, error);
                res.status(500).json({ message: `Error al obtener corte de caja con ID ${corteCajaId}`, error: error.message });
            }
        });
    }
    eliminarCorteCaja(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const corteCajaId = parseInt(req.params.id);
            if (!corteCajaId || isNaN(corteCajaId)) {
                res.status(400).json({ message: 'El ID del corte de caja proporcionado no es válido' });
                return;
            }
            try {
                const corteCaja = yield database_1.default.corteCaja.delete({
                    where: {
                        id: corteCajaId,
                    },
                });
                res.status(200).json({ message: `Corte de caja con ID ${corteCajaId} eliminado correctamente` });
            }
            catch (error) {
                console.error(`Error al eliminar corte de caja con ID ${corteCajaId}:`, error);
                res.status(500).json({ message: `Error al eliminar corte de caja con ID ${corteCajaId}`, error: error.message });
            }
        });
    }
}
exports.corteCajaController = new CorteCajaController();
