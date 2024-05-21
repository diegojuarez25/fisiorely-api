import { Request, Response } from "express";
// import dao from "../dao/auth.dao";
import prisma from '../database/database';
import jwt from 'jsonwebtoken';
import keySecret from "../config/keys";
import validator from 'validator';
import { utils } from '../utils/utils';

class AuthController {

    public async iniciarSesion(req: Request, res: Response) {
        try {

            // obtener los datos del body
            const { username, password, ...rest } = req.body;

            // Se verifica la estructura de la petición
            if (Object.keys(rest).length > 0) {
                return res.status(400).json({ message : "La estructura no es correcta", code: 1 });
            }

            // Verificar que los datos "username" y "password" existan
             if (!username || !password) {
                return res.status(400).json({ message : "Todos los campos son requeridos", code: 1});
            }

            // verificar que los datos no esten vacios
            if (validator.isEmpty(username.trim())
                || validator.isEmpty(password.trim())) {
                    return res.status(400).json({ message : "Todos los campos son requeridos", code: 1 });
            }

            // const lstUsers = await dao.getuserByusername(username);
            const usuario = await prisma.usuario.findFirst({
                where: {
                    username: username
                }
            });

            if (!usuario) {
                return res.status(404).json({ message : "El usuario y/o contraseña es incorrecto", code: 1});
            }

            if (await utils.checkPassword(password, usuario.password)) {
                const {password, fechaRegistro, ... newUser} = usuario;

                var token = jwt.sign(newUser, keySecret.key.secret, { expiresIn: '1h'});
                
                return res.json({ message : "Autentificación correcta", token, code: 0 });
            } else {
                return res.status(404).json({ message : "El usuario y/o contraseña es incorrecto", code: 1});
            }
            
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

}
export const authController = new AuthController();