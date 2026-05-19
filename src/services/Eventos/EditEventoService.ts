import prismaClient from "../../prisma";
import { EditEventoRequest } from "../../models/interfaces/Eventos/EditEventoRequest";

class EditEventoService {
    async execute ({id, nome, data, horario, valor} : EditEventoRequest) {
        if(!nome || !data || !horario || !valor || !id) {
            throw new Error ("Dados incompletos");
        }

        const evento = await prismaClient.evento.update({
            where: {
                id: id
            },
            data: {
                nome: nome,
                data: data,
                horario: horario,
                valor: valor
            }
        })

    }
}

export { EditEventoService }