import prismaClient from "../../prisma"
import { EditUserRequest } from "../../models/interfaces/User/EditUserRequest"

class EditUserService {
    async execute ({nome, email, id} : EditUserRequest) {
        if(!nome || !email) {
            throw new Error ("Os dados não podem estar vazios");
        }

        const userEdited = await prismaClient.usuario.update({
            where: {
                id: id
            },
            data: {
                nome: nome,
                email: email
            },
            omit: {
                senha: true
            }
        });

        return userEdited;
    }
}

export { EditUserService }