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
exports.tipoIngresoController = void 0;
const database_1 = __importDefault(require("../database/database")); // Asegúrate de que el path es correcto
class TipoIngresoController {
    obtenerTiposIngreso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tiposIngreso = yield database_1.default.tipoIngreso.findMany();
                res.status(200).json(tiposIngreso);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener tipos de ingreso', error: error.message });
            }
        });
    }
    obtenerTipoIngresoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const tipoIngreso = yield database_1.default.tipoIngreso.findUnique({ where: { id: Number(id) } });
                if (!tipoIngreso) {
                    res.status(404).json({ message: 'Tipo de ingreso no encontrado' });
                    return;
                }
                res.status(200).json(tipoIngreso);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener tipo de ingreso', error: error.message });
            }
        });
    }
    agregarTipoIngreso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { descripcion } = req.body;
            try {
                const nuevoTipoIngreso = yield database_1.default.tipoIngreso.create({
                    data: { descripcion }
                });
                res.status(201).json({ message: 'Tipo de ingreso creado exitosamente', tipoIngreso: nuevoTipoIngreso });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear tipo de ingreso', error: error.message });
            }
        });
    }
    actualizarTipoIngreso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { descripcion } = req.body;
            try {
                const tipoIngresoActualizado = yield database_1.default.tipoIngreso.update({
                    where: { id: Number(id) },
                    data: { descripcion }
                });
                res.status(200).json({ message: 'Tipo de ingreso actualizado exitosamente', tipoIngreso: tipoIngresoActualizado });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar tipo de ingreso', error: error.message });
            }
        });
    }
    eliminarTipoIngreso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.tipoIngreso.delete({ where: { id: Number(id) } });
                res.status(200).json({ message: 'Tipo de ingreso eliminado exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar tipo de ingreso', error: error.message });
            }
        });
    }
}
exports.tipoIngresoController = new TipoIngresoController();
