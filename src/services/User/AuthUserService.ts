import prismaClient from "../../prisma";
import { AuthUserRequest } from "../../models/interfaces/User/auth/AuthUserRequest";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class AuthUserService {
    async execute ({email, senha} : AuthUserRequest) {
        if(!email || !senha) {
            throw new Error ("Dados incompletos");
        }

        const user = await prismaClient.usuario.findUnique({
            where: {
                email: email
            }
        });

        if(!user) {
            throw new Error ("Senha ou email invalido!");
        }

        const userFind = await compare(senha, user.senha);

        if(!userFind) {
            throw new Error ("Senha ou email invalido!");
        }

        const token = sign(
            {
                id: user?.id,
                role: user?.role,
            }, 
            process.env.JWT_SECRET as string,
            {
                subject: user?.id,
                expiresIn: "30d"
            }
        );

        return {
            id: user?.id,
            nome: user?.nome,
            email: user?.email,
            role: user?.role,
            token: token
        }

    }
}

export { AuthUserService }