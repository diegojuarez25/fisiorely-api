import { Request, Response } from "express";
import prisma from '../database/database';
import jwt from 'jsonwebtoken';
import keySecret from "../config/keys";
import validator from 'validator';
import { utils } from '../utils/utils';

class AuthController {
    public async iniciarSesion(req: Request, res: Response) {
        try {
            // Desestructurar datos del cuerpo de la solicitud
            const { email, password, ...rest } = req.body;

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
            if (validator.isEmpty(email.trim()) || validator.isEmpty(password.trim())) {
                return res.status(400).json({ message: "Todos los campos son requeridos", code: 1 });
            }

            // Buscar usuario por email
            const usuario = await prisma.usuario.findFirst({
                where: { email: email },
                include: { rol: true } // Incluir información del rol
            });

            console.log("Usuario encontrado:", usuario); // Añadido para depuración

            if (!usuario) {
                return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
            }

            // Verificar contraseña
            const passwordMatch = await utils.checkPassword(password, usuario.password);
            console.log("Password match:", passwordMatch); // Añadido para depuración

            if (passwordMatch) {
                // Desestructurar usuario y generar token JWT
                const { password: _, fecha_creacion, ...newUser } = usuario;
                const token = jwt.sign(newUser, keySecret.key.secret, { expiresIn: '1h' });
                
                return res.json({ message: "Autenticación correcta", token, role_id: usuario.rol.id, code: 0 }); // Incluir role_id en la respuesta
            } else {
                return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
            }

        } catch (error: any) {
            // Manejar errores
            console.error("Error durante el proceso de autenticación:", error); // Añadido para depuración
            return res.status(500).json({ message: `${error.message}` });
        }
    }
}

export const authController = new AuthController();
