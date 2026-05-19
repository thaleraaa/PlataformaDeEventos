import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { PayLoad } from "../models/interfaces/User/auth/PayLoad";

export function isAuthenticated (
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { id, role } = verify(token, process.env.JWT_SECRET!) as PayLoad;
        request.user_id = id;
        request.user_role = role;
        return next();
    } catch (error) {
        return response.status(401).end();
    }

}