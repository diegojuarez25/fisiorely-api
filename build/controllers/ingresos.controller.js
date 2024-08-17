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
exports.ingresosController = void 0;
const database_1 = __importDefault(require("../database/database"));
const moment_1 = __importDefault(require("moment"));
class IngresosController {
    obtenerIngresos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ingresos = yield database_1.default.ingreso.findMany({
                    include: {
                        tipo_ingreso: true,
                        forma_pago: true,
                        modalidad: true,
                        paciente: true // Incluir los datos del paciente
                    }
                });
                res.status(200).json(ingresos);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener ingresos', error: error.message });
            }
        });
    }
    obtenerIngresoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const ingreso = yield database_1.default.ingreso.findUnique({
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
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener ingreso', error: error.message });
            }
        });
    }
    agregarIngreso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo_ingreso_id, fecha_inicio, fecha_fin, paciente_id, forma_pago_id, monto, persona_que_atendio, modalidad_id } = req.body;
            try {
                const nuevoIngreso = yield database_1.default.ingreso.create({
                    data: {
                        tipo_ingreso_id,
                        fecha_inicio: (0, moment_1.default)(fecha_inicio).toDate(), // Parsear la fecha a objeto Date
                        fecha_fin: (0, moment_1.default)(fecha_fin).toDate(), // Parsear la fecha a objeto Date
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
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear ingreso', error: error.message });
            }
        });
    }
    actualizarIngreso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { tipo_ingreso_id, fecha_inicio, fecha_fin, paciente_id, forma_pago_id, monto, persona_que_atendio, modalidad_id } = req.body;
            try {
                const ingresoActualizado = yield database_1.default.ingreso.update({
                    where: { id: Number(id) },
                    data: {
                        tipo_ingreso_id,
                        fecha_inicio: (0, moment_1.default)(fecha_inicio).toDate(), // Parsear la fecha a objeto Date
                        fecha_fin: (0, moment_1.default)(fecha_fin).toDate(), // Parsear la fecha a objeto Date
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
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar ingreso', error: error.message });
            }
        });
    }
    eliminarIngreso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.ingreso.delete({ where: { id: Number(id) } });
                res.status(200).json({ message: 'Ingreso eliminado exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar ingreso', error: error.message });
            }
        });
    }
}
exports.ingresosController = new IngresosController();
