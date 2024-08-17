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
exports.formaPagoController = void 0;
const database_1 = __importDefault(require("../database/database"));
class FormaPagoController {
    obtenerFormasPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formasPago = yield database_1.default.formaPago.findMany();
                res.status(200).json(formasPago);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener formas de pago', error: error.message });
            }
        });
    }
    obtenerFormaPagoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const formaPago = yield database_1.default.formaPago.findUnique({ where: { id: Number(id) } });
                if (!formaPago) {
                    res.status(404).json({ message: 'Forma de pago no encontrada' });
                    return;
                }
                res.status(200).json(formaPago);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener forma de pago', error: error.message });
            }
        });
    }
    agregarFormaPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { descripcion } = req.body;
            try {
                const nuevaFormaPago = yield database_1.default.formaPago.create({
                    data: {
                        descripcion,
                    }
                });
                res.status(201).json({ message: 'Forma de pago creada exitosamente', formaPago: nuevaFormaPago });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear forma de pago', error: error.message });
            }
        });
    }
    actualizarFormaPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { descripcion } = req.body;
            try {
                const formaPagoActualizada = yield database_1.default.formaPago.update({
                    where: { id: Number(id) },
                    data: {
                        descripcion,
                    }
                });
                res.status(200).json({ message: 'Forma de pago actualizada exitosamente', formaPago: formaPagoActualizada });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar forma de pago', error: error.message });
            }
        });
    }
    eliminarFormaPago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.formaPago.delete({ where: { id: Number(id) } });
                res.status(200).json({ message: 'Forma de pago eliminada exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar forma de pago', error: error.message });
            }
        });
    }
}
exports.formaPagoController = new FormaPagoController();
