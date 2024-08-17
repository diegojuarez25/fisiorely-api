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
exports.modalidadController = void 0;
const database_1 = __importDefault(require("../database/database"));
class ModalidadController {
    obtenerModalidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modalidades = yield database_1.default.modalidad.findMany();
                res.status(200).json(modalidades);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener modalidades', error: error.message });
            }
        });
    }
    obtenerModalidadPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const modalidad = yield database_1.default.modalidad.findUnique({ where: { id: Number(id) } });
                if (!modalidad) {
                    res.status(404).json({ message: 'Modalidad no encontrada' });
                    return;
                }
                res.status(200).json(modalidad);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener modalidad', error: error.message });
            }
        });
    }
    agregarModalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { descripcion } = req.body;
            try {
                const nuevaModalidad = yield database_1.default.modalidad.create({
                    data: {
                        descripcion,
                    }
                });
                res.status(201).json({ message: 'Modalidad creada exitosamente', modalidad: nuevaModalidad });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear modalidad', error: error.message });
            }
        });
    }
    actualizarModalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { descripcion } = req.body;
            try {
                const modalidadActualizada = yield database_1.default.modalidad.update({
                    where: { id: Number(id) },
                    data: {
                        descripcion,
                    }
                });
                res.status(200).json({ message: 'Modalidad actualizada exitosamente', modalidad: modalidadActualizada });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar modalidad', error: error.message });
            }
        });
    }
    eliminarModalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.modalidad.delete({ where: { id: Number(id) } });
                res.status(200).json({ message: 'Modalidad eliminada exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar modalidad', error: error.message });
            }
        });
    }
}
exports.modalidadController = new ModalidadController();
