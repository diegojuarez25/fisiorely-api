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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const database_1 = __importDefault(require("../database/database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../config/keys"));
const validator_1 = __importDefault(require("validator"));
const utils_1 = require("../utils/utils");
class AuthController {
    iniciarSesion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Desestructurar datos del cuerpo de la solicitud
                const _a = req.body, { email, password } = _a, rest = __rest(_a, ["email", "password"]);
                console.log("Request body:", req.body); // Añadido para depuración
                // Verificar la estructura de la petición
                if (Object.keys(rest).length > 0) {
                    return res.status(400).json({ message: "La estructura de la solicitud no es correcta", code: 1 });
                }
                // Validar campos obligatorios
                if (!email || !password) {
                    return res.status(400).json({ message: "Todos los campos son requeridos", code: 1 });
                }
                // Validar campos vacíos
                if (validator_1.default.isEmpty(email.trim()) || validator_1.default.isEmpty(password.trim())) {
                    return res.status(400).json({ message: "Todos los campos son requeridos", code: 1 });
                }
                // Buscar usuario por email
                const usuario = yield database_1.default.usuario.findFirst({
                    where: { email: email },
                    include: { rol: true } // Incluir información del rol
                });
                console.log("Usuario encontrado:", usuario); // Añadido para depuración
                if (!usuario) {
                    return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
                }
                // Verificar contraseña
                const passwordMatch = yield utils_1.utils.checkPassword(password, usuario.password);
                console.log("Password match:", passwordMatch); // Añadido para depuración
                if (passwordMatch) {
                    // Desestructurar usuario y generar token JWT
                    const { password: _, fecha_creacion } = usuario, newUser = __rest(usuario, ["password", "fecha_creacion"]);
                    const token = jsonwebtoken_1.default.sign(newUser, keys_1.default.key.secret, { expiresIn: '1h' });
                    return res.json({ message: "Autenticación correcta", token, role_id: usuario.rol.id, code: 0 }); // Incluir role_id en la respuesta
                }
                else {
                    return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
                }
            }
            catch (error) {
                // Manejar errores
                console.error("Error durante el proceso de autenticación:", error); // Añadido para depuración
                return res.status(500).json({ message: `${error.message}` });
            }
        });
    }
}
exports.authController = new AuthController();
