import { Request, Response } from "express";
import { CreateEventoService } from "../../services/Eventos/CreateEventoService";
import { CreateEventoRequest } from "../../models/interfaces/Eventos/CreateEventoRequest";

class CreateEventoController {
    async handle (request: Request, response: Response) {
        const {nome, data, horario, valor} : CreateEventoRequest = request.body;
        const user_id = request.user_id;
        const createEventoService = new CreateEventoService();
        const evento = await createEventoService.execute({nome, data, horario, valor, user_id});
        return response.status(201).json(evento);
    }
}

export { CreateEventoController }