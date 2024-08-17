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
exports.consultasController = void 0;
const database_1 = __importDefault(require("../database/database"));
const moment_1 = __importDefault(require("moment"));
class ConsultasController {
    obtenerConsultas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consultas = yield database_1.default.consulta.findMany({
                    include: {
                        tipo_consulta: true,
                        paciente: true,
                        modalidad: true
                    }
                });
                // Estructurar datos incluyendo relaciones
                const consultasConRelaciones = consultas.map(consulta => ({
                    id: consulta.id.toString(),
                    padecimiento: consulta.padecimiento,
                    telefono: consulta.telefono,
                    edad: consulta.edad,
                    fecha_inicio: consulta.fecha_inicio,
                    fecha_creacion: consulta.fecha_creacion,
                    fecha_actualizacion: consulta.fecha_actualizacion,
                    tipo_consulta: consulta.tipo_consulta.descripcion,
                    modalidad: consulta.modalidad.descripcion,
                    paciente: {
                        nombre: consulta.paciente.nombre,
                        apellido_paterno: consulta.paciente.apellido_paterno,
                        apellido_materno: consulta.paciente.apellido_materno,
                        telefono: consulta.paciente.telefono,
                        edad: consulta.paciente.edad
                    }
                }));
                res.status(200).json(consultasConRelaciones);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener consultas', error: error.message });
            }
        });
    }
    obtenerConsultaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const consulta = yield database_1.default.consulta.findUnique({
                    where: { id: Number(id) },
                    include: {
                        tipo_consulta: true,
                        paciente: true,
                        modalidad: true
                    }
                });
                if (!consulta) {
                    res.status(404).json({ message: 'Consulta no encontrada' });
                    return;
                }
                // Estructurar datos incluyendo relaciones
                const consultaConRelaciones = {
                    id: consulta.id.toString(),
                    padecimiento: consulta.padecimiento,
                    telefono: consulta.telefono,
                    edad: consulta.edad,
                    fecha_inicio: consulta.fecha_inicio,
                    fecha_creacion: consulta.fecha_creacion,
                    fecha_actualizacion: consulta.fecha_actualizacion,
                    tipo_consulta: consulta.tipo_consulta.descripcion,
                    modalidad: consulta.modalidad.descripcion,
                    paciente: {
                        nombre: consulta.paciente.nombre,
                        apellido_paterno: consulta.paciente.apellido_paterno,
                        apellido_materno: consulta.paciente.apellido_materno,
                        telefono: consulta.paciente.telefono,
                        edad: consulta.paciente.edad
                    }
                };
                res.status(200).json(consultaConRelaciones);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener consulta', error: error.message });
            }
        });
    }
    agregarConsulta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo_consulta_id, modalidad_id, paciente_id, padecimiento, persona_que_atendio, fecha_inicio } = req.body;
            try {
                // Obtener los datos del paciente
                const paciente = yield database_1.default.paciente.findUnique({
                    where: { id: Number(paciente_id) }
                });
                if (!paciente) {
                    res.status(404).json({ message: 'Paciente no encontrado' });
                    return;
                }
                // Crear la consulta incluyendo los datos del paciente
                const nuevaConsulta = yield database_1.default.consulta.create({
                    data: {
                        tipo_consulta_id: Number(tipo_consulta_id),
                        modalidad_id: Number(modalidad_id),
                        paciente_id: Number(paciente_id),
                        padecimiento,
                        telefono: paciente.telefono,
                        edad: paciente.edad,
                        fecha_inicio: (0, moment_1.default)(fecha_inicio).toDate(), // Parsear la fecha a objeto Date
                        fecha_creacion: new Date()
                    },
                    include: {
                        tipo_consulta: true,
                        paciente: true,
                        modalidad: true
                    }
                });
                // Estructurar datos incluyendo relaciones
                const nuevaConsultaConRelaciones = {
                    id: nuevaConsulta.id.toString(),
                    padecimiento: nuevaConsulta.padecimiento,
                    telefono: nuevaConsulta.telefono,
                    edad: nuevaConsulta.edad,
                    fecha_inicio: nuevaConsulta.fecha_inicio,
                    fecha_creacion: nuevaConsulta.fecha_creacion,
                    fecha_actualizacion: nuevaConsulta.fecha_actualizacion,
                    tipo_consulta: nuevaConsulta.tipo_consulta.descripcion,
                    modalidad: nuevaConsulta.modalidad.descripcion,
                    paciente: {
                        nombre: nuevaConsulta.paciente.nombre,
                        apellido_paterno: nuevaConsulta.paciente.apellido_paterno,
                        apellido_materno: nuevaConsulta.paciente.apellido_materno,
                        telefono: nuevaConsulta.paciente.telefono,
                        edad: nuevaConsulta.paciente.edad
                    }
                };
                res.status(201).json({ message: 'Consulta creada exitosamente', consulta: nuevaConsultaConRelaciones });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear consulta', error: error.message });
            }
        });
    }
    actualizarConsulta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { tipo_consulta_id, modalidad_id, paciente_id, padecimiento, persona_que_atendio, fecha_inicio } = req.body;
            try {
                // Obtener los datos del paciente
                const paciente = yield database_1.default.paciente.findUnique({
                    where: { id: Number(paciente_id) }
                });
                if (!paciente) {
                    res.status(404).json({ message: 'Paciente no encontrado' });
                    return;
                }
                // Actualizar la consulta incluyendo los datos del paciente
                const consultaActualizada = yield database_1.default.consulta.update({
                    where: { id: Number(id) },
                    data: {
                        tipo_consulta_id: Number(tipo_consulta_id),
                        modalidad_id: Number(modalidad_id),
                        paciente_id: Number(paciente_id),
                        padecimiento,
                        telefono: paciente.telefono,
                        edad: paciente.edad,
                        fecha_inicio: (0, moment_1.default)(fecha_inicio).toDate(), // Parsear la fecha a objeto Date
                        fecha_actualizacion: new Date()
                    },
                    include: {
                        tipo_consulta: true,
                        paciente: true,
                        modalidad: true
                    }
                });
                // Estructurar datos incluyendo relaciones
                const consultaActualizadaConRelaciones = {
                    id: consultaActualizada.id.toString(),
                    padecimiento: consultaActualizada.padecimiento,
                    telefono: consultaActualizada.telefono,
                    edad: consultaActualizada.edad,
                    fecha_inicio: consultaActualizada.fecha_inicio,
                    fecha_creacion: consultaActualizada.fecha_creacion,
                    fecha_actualizacion: consultaActualizada.fecha_actualizacion,
                    tipo_consulta: consultaActualizada.tipo_consulta.descripcion,
                    modalidad: consultaActualizada.modalidad.descripcion,
                    paciente: {
                        nombre: consultaActualizada.paciente.nombre,
                        apellido_paterno: consultaActualizada.paciente.apellido_paterno,
                        apellido_materno: consultaActualizada.paciente.apellido_materno,
                        telefono: consultaActualizada.paciente.telefono,
                        edad: consultaActualizada.paciente.edad
                    }
                };
                res.status(200).json({ message: 'Consulta actualizada exitosamente', consulta: consultaActualizadaConRelaciones });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar consulta', error: error.message });
            }
        });
    }
    eliminarConsulta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.consulta.delete({ where: { id: Number(id) } });
                res.status(200).json({ message: 'Consulta eliminada exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar consulta', error: error.message });
            }
        });
    }
}
exports.consultasController = new ConsultasController();
