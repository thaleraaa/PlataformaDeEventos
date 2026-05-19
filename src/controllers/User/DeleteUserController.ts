import { Request, Response } from "express";
import { DeleteUserService } from "../../services/User/DeleteUserService";

class DeleteUserController {
    async handle(request: Request, response: Response) {
        const user_id = request?.user_id;
        const deleteUserService = new DeleteUserService();
        const deletedUser = await deleteUserService.execute(user_id);
        return response.status(200).json(deletedUser);
    }
}

export { DeleteUserController }