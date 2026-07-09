import { Request, Response } from "express";
import { FindMyEventosService } from "../../services/Eventos/FindMyEventosService";

class FindMyEventosController {
    async handle (request: Request, response: Response) {
        const user_id = request?.user_id;
        const findMyEventosService = new FindMyEventosService();
        const eventos = await findMyEventosService.execute(user_id);
        return response.status(200).json(eventos);
    }
}

export { FindMyEventosController }