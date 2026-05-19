import prismaClient from "../../prisma";

class FindMyEventosService {
    async execute (user_id: string) {

        if(!user_id) {
            throw new Error("Invalido");
        }

        return prismaClient.evento.findMany({
            where: {
                user_id: user_id
            }
        });
    }
}

export { FindMyEventosService }