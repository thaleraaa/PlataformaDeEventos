import { Request, Response } from "express";
import { DetailUserService } from "../../services/User/DetailUserService";

class DetailUserController {
    async handle(request: Request, response: Response) {
        const user_id = request?.user_id;
        const detailUserService = new DetailUserService();
        const readUser = await detailUserService.execute(user_id);
        return response.status(200).json(readUser);
    }
}

export { DetailUserController }