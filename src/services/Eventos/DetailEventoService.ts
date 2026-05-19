import prismaClient from "../../prisma";

class DetailEventoService {
    async execute (id: string) {
        return prismaClient.evento.findUnique({
            where: {
                id: id
            }
        });
    }
}

export { DetailEventoService }