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
exports.tipoConsultaController = void 0;
const database_1 = __importDefault(require("../database/database"));
class TipoConsultaController {
    obtenerTiposConsulta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tiposConsulta = yield database_1.default.tipoConsulta.findMany();
                res.status(200).json(tiposConsulta);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener tipos de consulta', error: error.message });
            }
        });
    }
    obtenerTipoConsultaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const tipoConsulta = yield database_1.default.tipoConsulta.findUnique({ where: { id: Number(id) } });
                if (!tipoConsulta) {
                    res.status(404).json({ message: 'Tipo de consulta no encontrado' });
                    return;
                }
                res.status(200).json(tipoConsulta);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener tipo de consulta', error: error.message });
            }
        });
    }
    agregarTipoConsulta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { descripcion } = req.body;
            try {
                const nuevoTipoConsulta = yield database_1.default.tipoConsulta.create({
                    data: {
                        descripcion,
                    }
                });
                res.status(201).json({ message: 'Tipo de consulta creado exitosamente', tipoConsulta: nuevoTipoConsulta });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear tipo de consulta', error: error.message });
            }
        });
    }
    actualizarTipoConsulta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { descripcion } = req.body;
            try {
                const tipoConsultaActualizado = yield database_1.default.tipoConsulta.update({
                    where: { id: Number(id) },
                    data: {
                        descripcion,
                    }
                });
                res.status(200).json({ message: 'Tipo de consulta actualizado exitosamente', tipoConsulta: tipoConsultaActualizado });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar tipo de consulta', error: error.message });
            }
        });
    }
    eliminarTipoConsulta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.tipoConsulta.delete({ where: { id: Number(id) } });
                res.status(200).json({ message: 'Tipo de consulta eliminado exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar tipo de consulta', error: error.message });
            }
        });
    }
}
exports.tipoConsultaController = new TipoConsultaController();
