import prismaClient from "../../prisma";

class DeleteUserService {
    async execute (id: string) {
        return prismaClient.evento.delete({
            where: {
                id: id
            }
        });
    }
}

export { DeleteUserService }