import { Request, Response } from "express";
import { FindAllEventosService } from "../../services/Eventos/FindAllEventosService";

class FindAllEventosController {
    async handle(request: Request, response: Response) {
        const findAllEventosService = new FindAllEventosService();
        const eventos = await findAllEventosService.execute();
        return response.status(200).json(eventos);
    }
}

export { FindAllEventosController }