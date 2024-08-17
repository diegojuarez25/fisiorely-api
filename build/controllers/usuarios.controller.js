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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database/database"));
const utils_1 = require("../utils/utils");
class UsuariosController {
    obtenerUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield database_1.default.usuario.findMany();
                res.status(200).json(usuarios);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
            }
        });
    }
    obtenerUsuarioPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const usuario = yield database_1.default.usuario.findUnique({ where: { id: Number(id) } });
                if (!usuario) {
                    res.status(404).json({ message: 'Usuario no encontrado' });
                    return;
                }
                res.status(200).json(usuario);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
            }
        });
    }
    agregarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido_paterno, apellido_materno, email, password, rol_id } = req.body;
            try {
                // Hashear la contraseña antes de guardarla
                const hashedPassword = yield utils_1.utils.hashPassword(password);
                const nuevoUsuario = yield database_1.default.usuario.create({
                    data: {
                        nombre,
                        apellido_paterno,
                        apellido_materno,
                        email,
                        password: hashedPassword,
                        rol_id,
                        fecha_creacion: new Date(),
                        fecha_actualizacion: new Date()
                    }
                });
                res.status(201).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear usuario', error: error.message });
            }
        });
    }
    actualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, apellido_paterno, apellido_materno, email, password, rol_id } = req.body;
            try {
                // Construir los datos de actualización
                const dataToUpdate = {
                    nombre,
                    apellido_paterno,
                    apellido_materno,
                    email,
                    rol_id,
                    fecha_actualizacion: new Date()
                };
                // Hashear la nueva contraseña si se proporciona
                if (password) {
                    dataToUpdate.password = yield utils_1.utils.hashPassword(password);
                }
                const usuarioActualizado = yield database_1.default.usuario.update({
                    where: { id: Number(id) },
                    data: dataToUpdate
                });
                res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
            }
        });
    }
    eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.default.usuario.delete({ where: { id: Number(id) } });
                res.status(200).json({ message: 'Usuario eliminado exitosamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
            }
        });
    }
}
exports.usuariosController = new UsuariosController();
