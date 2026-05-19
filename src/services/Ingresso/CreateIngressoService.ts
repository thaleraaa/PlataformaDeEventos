import prismaClient from "../../prisma";
import { CreateIngressoRequest } from "../../models/interfaces/Ingresso/CreateIngressoRequest";

class CreateIngressoService {
    async execute ({qrcode, user_id, evento_id} : CreateIngressoRequest) {
        if(!qrcode || !user_id || !evento_id) {
            throw new Error ("Dados incompletos");
        }

        const ingresso = await prismaClient.ingresso.create({
            data: {
                qrcode: qrcode,
                user_id: user_id,
                evento_id: evento_id
            }
        });

        return ingresso;

    }
}

export { CreateIngressoService }