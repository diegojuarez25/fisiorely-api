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
exports.gastosController = void 0;
const database_1 = __importDefault(require("../database/database"));
class GastosController {
    obtenerGastos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gastos = yield database_1.default.gasto.findMany({
                    include: {
                        forma_pago: true, // Incluir los datos de la forma de pago
                    },
                });
                res.status(200).json(gastos);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener gastos', error: error.message });
            }
        });
    }
    obtenerGastoPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const gasto = yield database_1.default.gasto.findUnique({
                    where: { id: Number(id) },
                    include: {
                        forma_pago: true, // Incluir los datos de la forma de pago
                    },
                });
                if (!gasto) {
                    res.status(404).json({ message: 'Gasto no encontrado' });
                    return;
                }
                res.status(200).json(gasto);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener gasto', error: error.message });
            }
        });
    }
    agregarGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { concepto, monto, forma_pago_id, fecha } = req.body;
            try {
                const nuevoGasto = yield database_1.default.gasto.create({
                    data: {
                        concepto,
                        monto,
                        forma_pago_id,
                        fecha,
                        fecha_creacion: new Date(),
                        fecha_actualizacion: new Date()
                    }
                });
                res.status(201).json({ message: 'Gasto creado exitosamente', gasto: nuevoGasto });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear gasto', error: error.message });
            }
        });
    }
    actualizarGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { concepto, monto, forma_pago_id, fecha } = req.body;
            try {
                const gastoActualizado = yield database_1.default.gasto.update({
                    where: { id: Number(id) },
                    data: {
                        concepto,
                        monto,
                        forma_pago_id,
                        fecha,
                        fecha_actualizacion: new Date()
                    }
                });
                res.status(200).json({ message: 'Gasto actualizado exitosamente', gasto: gastoActualizado });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar gasto', error: error.message });
            }
        });
    }
    eliminarGasto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.gasto.delete({ where: { id: Number(id) } });
                res.status(200).json({ message: 'Gasto eliminado exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar gasto', error: error.message });
            }
        });
    }
}
exports.gastosController = new GastosController();
