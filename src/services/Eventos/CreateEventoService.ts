import prismaClient from "../../prisma";
import { CreateEventoRequest } from "../../models/interfaces/Eventos/CreateEventoRequest";

class CreateEventoService {
    async execute ({nome, data, horario, valor, user_id, imagem, rua, bairro, cidade, estado} : CreateEventoRequest) {
        if(!nome || !data || !horario || !valor || !user_id || !rua || !bairro || !cidade || !estado) {
            throw new Error ("Dados incompletos");
        }

        const valorNumber = Number(valor);

        const evento = await prismaClient.evento.create({
            data: {
                nome: nome,
                data: data,
                horario: horario,
                valor: valorNumber,
                user_id: user_id,
                imagem: imagem,
                rua: rua,
                bairro: bairro,
                cidade: cidade,
                estado: estado
            }
        });

        return evento;
    }
}

export { CreateEventoService }