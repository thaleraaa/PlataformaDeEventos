import prismaClient from "../../prisma";

class DeleteUserService {
    async execute (id : string) {
        return prismaClient.usuario.delete({
            where: {
                id: id
            }, 
            omit: {
                senha: true
            }
        })
    }
}

export { DeleteUserService }