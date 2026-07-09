import { Request, Response } from "express";
import { DetailEventoService } from "../../services/Eventos/DetailEventoService";

class DetailEventoController {
    async handle (request: Request, response: Response) {
        const id = request.query.id as string;
        const detailEventoService = new DetailEventoService();
        const evento = await detailEventoService.execute(id);
        return response.status(201).json(evento);
    }
}

export { DetailEventoController }