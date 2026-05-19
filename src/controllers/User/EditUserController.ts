import { Request, Response } from "express";
import { EditUserService } from "../../services/User/EditUserService";
import { EditUserRequest } from "../../models/interfaces/User/EditUserRequest";

class EditUserController {
    async handle (request: Request, response: Response) {
        const { nome, email } : EditUserRequest = request.body;
        const id = request.query.id as string;
        const editUserService = new EditUserService();
        const editedUser = await editUserService.execute({nome, email, id});
        return response.status(200).json(editedUser);
    }
}

export { EditUserController }