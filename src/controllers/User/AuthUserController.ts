import { Request, Response } from "express";
import { AuthUserRequest } from "../../models/interfaces/User/auth/AuthUserRequest";
import { AuthUserService } from "../../services/User/AuthUserService";

class AuthUserController {
    async handle (request: Request, response: Response) {
        const { email, senha } : AuthUserRequest = request.body;
        const authUserService = new AuthUserService();
        const user = await authUserService.execute({email, senha});
        return response.status(200).json(user);
    }
}

export { AuthUserController }