import { Request, Response } from "express";
import { DeleteEventoService } from "../../services/Eventos/DeleteEventoService";

class DeleteEventoController {
    async handle (request: Request, response: Response) {
        const id = request.query.id as string;
        const deleteEventoService = new DeleteEventoService();
        const eventoDeleteted = await deleteEventoService.execute(id);
        return response.status(200).json(eventoDeleteted);
    }
}

export { DeleteEventoController }