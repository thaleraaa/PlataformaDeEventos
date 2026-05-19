import { NextFunction, Request, Response } from "express";

export function isAdmin (
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (request.user_role as string === 'ADMINISTRADOR') {
        return next();
    } else {
        return response.status(403).json({ message: 'Não autorizado' });        
    }
}