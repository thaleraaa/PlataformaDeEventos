import prismaClient from "../../prisma";
import { resolve } from "path";
import { existsSync } from "fs";

class GetImageEventoService {
    async execute (filename: string) {
        if(filename){
            const imagePath = resolve(__dirname, "..", "..", "..", "tmp", filename);

            if(!existsSync(imagePath)) {
                throw new Error("Image not found");
            }

            return imagePath;
        } else {
            throw new Error("Filename is required"); 
        }
    }
}

export { GetImageEventoService }