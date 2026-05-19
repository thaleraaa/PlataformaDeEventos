import { Request, Response } from "express";
import { EditEventoRequest } from "../../models/interfaces/Eventos/EditEventoRequest";
import { EditEventoService } from "../../services/Eventos/EditEventoService";

class EditEventoController {
    async handle(request: Request, response: Response) {
        const { nome, data, horario, valor } : EditEventoRequest = request.body;
        const id = request.query.id as string;
        const editEventoService = new EditEventoService();
        const editedEvento = await editEventoService.execute({id,nome,data,horario,valor});
        return response.status(200).json(editedEvento);
    }
}

export { EditEventoController }