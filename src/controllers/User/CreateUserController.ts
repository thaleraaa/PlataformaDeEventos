import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";
import { CreateUserRequest } from "../../models/interfaces/User/CreateUserRequest";

class CreateUserController {
    async handle (request: Request, response: Response) {
        const { nome, email, senha, role } : CreateUserRequest = request.body;
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({nome, email, senha, role});
        return response.status(201).json(user);
    }
}

export { CreateUserController }