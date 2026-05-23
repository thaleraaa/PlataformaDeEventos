import { Request, Response } from "express";
import { GetImageEventoService } from "../../services/Eventos/GetImageEventoService";

class GetImageEventoController {
    async handle (request: Request, response: Response) {
        const filename = request.query.filename as string;
        const getImageEventoService = new GetImageEventoService();
        const imagem = await getImageEventoService.execute(filename);
        return response.status(200).sendFile(imagem);
    }
}

export { GetImageEventoController }