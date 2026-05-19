import prismaClient from "../../prisma";

class FindByUserIngressoService {
    async execute (user_id: string) {
        if(!user_id) {
            throw new Error ("Dados incompletos");
        }

        return prismaClient.ingresso.findMany({
            where: {
                user_id: user_id
            },
            include: {
                evento: true
            }
        });
    }
}

export { FindByUserIngressoService }