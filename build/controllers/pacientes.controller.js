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
exports.pacientesController = void 0;
const database_1 = __importDefault(require("../database/database"));
class PacientesRController {
    obtenerPacientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pacientes = yield database_1.default.paciente.findMany();
                res.status(200).json(pacientes);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener pacientes', error: error.message });
            }
        });
    }
    obtenerPacientePorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const paciente = yield database_1.default.paciente.findUnique({ where: { id: Number(id) } });
                if (!paciente) {
                    res.status(404).json({ message: 'Paciente no encontrado' });
                    return;
                }
                res.status(200).json(paciente);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener paciente', error: error.message });
            }
        });
    }
    agregarPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido_paterno, apellido_materno, telefono, edad, estado } = req.body;
            try {
                const nuevoPaciente = yield database_1.default.paciente.create({
                    data: {
                        nombre,
                        apellido_paterno,
                        apellido_materno,
                        telefono,
                        edad,
                        estado,
                        fecha_creacion: new Date()
                    }
                });
                res.status(201).json({ message: 'Paciente creado exitosamente', paciente: nuevoPaciente });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear paciente', error: error.message });
            }
        });
    }
    actualizarPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, apellido_paterno, apellido_materno, telefono, edad, estado } = req.body;
            try {
                const pacienteActualizado = yield database_1.default.paciente.update({
                    where: { id: Number(id) },
                    data: {
                        nombre,
                        apellido_paterno,
                        apellido_materno,
                        telefono,
                        edad,
                        estado
                    }
                });
                res.status(200).json({ message: 'Paciente actualizado exitosamente', paciente: pacienteActualizado });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar paciente', error: error.message });
            }
        });
    }
    eliminarPaciente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.paciente.delete({ where: { id: Number(id) } });
                res.status(200).json({ message: 'Paciente eliminado exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar paciente', error: error.message });
            }
        });
    }
}
exports.pacientesController = new PacientesRController();
