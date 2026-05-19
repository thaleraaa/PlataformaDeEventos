import prismaClient from "../../prisma";

class DetailUserService {
    async execute(id : string) {
        return prismaClient.usuario.findUnique({
            where: {
                id: id
            },
            omit: {
                senha: true
            }
        })
    }
}

export { DetailUserService }