import prismaClient from "../../prisma";

class FindAllEventosService {
    async execute () {

                // Data local de Brasília (GMT-3)
        const hoje = new Date();
        // Ajusta para o fuso de Brasília (caso o servidor esteja em UTC)
        const brasiliaOffsetMs = -3 * 60 * 60 * 1000;
        const dataBrasilia = new Date(hoje.getTime() + brasiliaOffsetMs);
        const localDate = dataBrasilia.getFullYear() + '-' +
            String(dataBrasilia.getMonth() + 1).padStart(2, '0') + '-' +
            String(dataBrasilia.getDate()).padStart(2, '0');

        const eventos = await prismaClient.evento.findMany({
            where: {
                ativo: true,
                data: {
                    gte: localDate
                }
            }
        });

        return eventos;
    }
}

export { FindAllEventosService }

