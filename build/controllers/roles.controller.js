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
exports.rolesController = void 0;
const database_1 = __importDefault(require("../database/database"));
class RolesController {
    obtenerRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield database_1.default.role.findMany();
                res.status(200).json(roles);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener roles', error: error.message });
            }
        });
    }
    obtenerRolPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const rol = yield database_1.default.role.findUnique({ where: { id: Number(id) } });
                if (!rol) {
                    res.status(404).json({ message: 'Rol no encontrado' });
                    return;
                }
                res.status(200).json(rol);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener rol', error: error.message });
            }
        });
    }
    agregarRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion } = req.body;
            try {
                const nuevoRol = yield database_1.default.role.create({
                    data: {
                        nombre,
                        descripcion,
                        fecha_creacion: new Date()
                    }
                });
                res.status(201).json({ message: 'Rol creado exitosamente', rol: nuevoRol });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear rol', error: error.message });
            }
        });
    }
    actualizarRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, descripcion } = req.body;
            try {
                const rolActualizado = yield database_1.default.role.update({
                    where: { id: Number(id) },
                    data: {
                        nombre,
                        descripcion,
                    }
                });
                res.status(200).json({ message: 'Rol actualizado exitosamente', rol: rolActualizado });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar rol', error: error.message });
            }
        });
    }
    eliminarRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.role.delete({ where: { id: Number(id) } });
                res.status(200).json({ message: 'Rol eliminado exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar rol', error: error.message });
            }
        });
    }
}
exports.rolesController = new RolesController();
