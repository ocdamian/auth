
import { NextFunction, request, Request, Response } from 'express';
import { ErrorHandlerJSON } from '../middlewares/error.handler';
import { factoryLogger } from '../utils/logger';

import jwt from 'jsonwebtoken';

// pasar esto a un scheme 
import bcrypt from 'bcryptjs'


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

        return res.json({
            pong: "pong!!"
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
    return bcrypt.compare(password, 'passDatabase'); /// esto regresa una promesa
}