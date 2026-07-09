import prismaClient from "../../prisma";
import { CreateUserRequest } from "../../models/interfaces/User/CreateUserRequest";
import { hash } from "bcryptjs"
 
class CreateUserService {
    async execute ({nome, email, senha, role} : CreateUserRequest) {
        if(!nome || !email || !senha || !role) {
            throw new Error ("Dados incompleto");
        } 

        const senhaHash = await hash(senha, 8);

        const user = await prismaClient.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaHash,
                role: role
            },
            omit: {
                senha: true
            }
        });

        return user;

    }
}

export { CreateUserService }