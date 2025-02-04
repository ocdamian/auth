
import { NextFunction, request, Request, Response } from 'express';
import { ErrorHandlerJSON } from '../middlewares/error.handler';
import { factoryLogger } from '../utils/logger';

import jwt from 'jsonwebtoken';

// pasar esto a un scheme 
import bcrypt from 'bcryptjs'
import { DataValidationError } from '../exceptions/manager.exceptions';


const logger = factoryLogger({ _caller: 'auth.controller' });



export const ping = async (req: Request, res: Response, _next: NextFunction) => {
    try {

        return res.json({
            pong: "pong!!"
        });
    } catch (err) {
        return ErrorHandlerJSON(res).sendError(err);
    }
}

export const signup = async (req: Request, res: Response, _next: NextFunction) => {
    try {

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        logger.info(username);

        //token
        const token: string = jwt.sign({ _id: 1 }, process.env.TOKEN_SECRET || 'default',{
            expiresIn: 60 * 60 * 24
        });

        //sifrar la contrasena
        const salt = await bcrypt.genSalt(10);
        const passhash = await bcrypt.hash(password, salt);

        res.json({
            token,
            username,
            password,
            email,
            passhash
        });
    } catch (err) {
        return ErrorHandlerJSON(res).sendError(err);
    }
}

export const signin = async (req: Request, res: Response, _next: NextFunction) => {
    try {

        const { username, password } = req.body;
        // aqui hacemos la busqueda en la base de datos
        // const auth = await authService.signin(username, password);
       const passwordIsValid =  await validatePassword(password);

       if (!passwordIsValid) {
        throw new DataValidationError(`access denied`);
       }


       const token: string = jwt.sign({ _id: 1 }, process.env.TOKEN_SECRET || 'default',{
          expiresIn: 60 * 60 * 24
       });

       res.json({
        username,
        token,
    });
    } catch (err) {
        return ErrorHandlerJSON(res).sendError(err);
    }
}

export const profile = async (req: Request, res: Response, _next: NextFunction) => {
    try {

        const userId = (req as any).decode;

        return res.json({
            decode:  userId
        });
    } catch (err) {
        return ErrorHandlerJSON(res).sendError(err);
    }
}


/// esto es para ponerlo en el schema
const validatePassword = async (password: string): Promise<boolean> => {
    return bcrypt.compare(password, '$2a$10$6CMwRSJ3q9V/WsEY9PKNk.jr1uR8Ip6brPkENfVKELhVjLO3e8USy'); /// esto regresa una promesa "password" pero en hash simula la que sta en base de datos
}