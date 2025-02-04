
import { NextFunction, request, Request, Response } from 'express';
import { ErrorHandlerJSON } from '../middlewares/error.handler';

import jwt from 'jsonwebtoken';
import { DataValidationError } from '../exceptions/manager.exceptions';

export const verifyToken = async (req: Request, res: Response, _next: NextFunction) => {
    try {

        const authHeader = req.headers['authorization'];

        if (!authHeader) throw new DataValidationError(`No token provided`);

        const decoded: any = jwt.verify(authHeader, process.env.TOKEN_SECRET || 'default');

        // Guardar el ID decodificado en el objeto request para su uso posterior
        (req as any).decode = decoded;

        // Continuar con el siguiente middleware o la siguiente acción
        _next();

    } catch (err) {
        return ErrorHandlerJSON(res).sendError(err);
    }
}