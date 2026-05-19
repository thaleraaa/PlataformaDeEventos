import { Request, Response } from "express";
import { FindByUserIngressoService } from "../../services/Ingresso/FindByUserIngressoService";

class FindByUserIngressoController {
    async handle (request: Request, response: Response) {
        const user_id = request?.user_id;
        const findByUserIngressoService = new FindByUserIngressoService();
        const ingressos = await findByUserIngressoService.execute(user_id);
        return response.status(200).json(ingressos);
    }
}

export { FindByUserIngressoController }