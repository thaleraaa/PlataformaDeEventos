import prismaClient from "../../prisma";
import { EditEventoRequest } from "../../models/interfaces/Eventos/EditEventoRequest";

class EditEventoService {
    async execute ({id, nome, data, horario, valor, imagem, rua, bairro, cidade, estado} : EditEventoRequest) {
        if(!nome || !data || !horario || !valor || !id || !rua || !bairro || !cidade || !estado) {
            throw new Error ("Dados incompletos");
        }

        const valorNumber = Number(valor);


        const evento = await prismaClient.evento.update({
            where: {
                id: id
            },
            data: {
                nome: nome,
                data: data,
                horario: horario,
                valor: valorNumber,
                imagem: imagem,
                rua: rua,
                bairro: bairro,
                cidade: cidade,
                estado: estado
            }
        })

        return evento;

    }
}

export { EditEventoService }