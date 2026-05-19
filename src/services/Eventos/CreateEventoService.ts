import prismaClient from "../../prisma";
import { CreateEventoRequest } from "../../models/interfaces/Eventos/CreateEventoRequest";

class CreateEventoService {
    async execute ({nome, data, horario, valor, user_id} : CreateEventoRequest) {
        if(!nome || !data || !horario || !valor || !user_id) {
            throw new Error ("Dados incompletos");
        }

        const evento = await prismaClient.evento.create({
            data: {
                nome: nome,
                data: data,
                horario: horario,
                valor: valor,
                user_id: user_id
            }
        });

        return evento;

    }
}

export { CreateEventoService }