import { Request, Response } from "express";
import { CreateIngressoService } from "../../services/Ingresso/CreateIngressoService";
import { CreateIngressoRequest } from "../../models/interfaces/Ingresso/CreateIngressoRequest";

class CreateIngressoController {
    async handle(request: Request, response: Response) {
        const { qrcode } : CreateIngressoRequest = request.body
        const evento_id = request?.query.evento_id as string;
        const user_id  = request?.user_id;
        const createIngressoService = new CreateIngressoService();
        const ingresso = await createIngressoService.execute({qrcode, user_id, evento_id});
        return response.status(201).json(ingresso);
    }
}

export { CreateIngressoController }