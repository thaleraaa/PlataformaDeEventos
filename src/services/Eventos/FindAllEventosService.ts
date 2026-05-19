import prismaClient from "../../prisma";

class FindAllEventosService {
    async execute () {

        const hoje = new Date().toISOString().split('T')[0];

        const eventos = await prismaClient.evento.findMany({
            where: {
                ativo: true,
                data: {
                    gte: hoje
                }
            }
        });

        return eventos;
    }
}

export { FindAllEventosService }

