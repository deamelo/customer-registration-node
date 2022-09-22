import { IClient } from "../../interfaces/clients"
import AppDataSource from "../../data-source"
import { Client } from "../../entities/client.entity"
import { AppError } from "../../errors/appError"
import { hash } from "bcryptjs"

const createClientService = async ({ name, email, password, telephone }: IClient) => {

    const clientRepository = AppDataSource.getRepository(Client)

    const emailAlreadyExists = await clientRepository.findOneBy({email})

    if (emailAlreadyExists) {
        throw new AppError(409, "Email already exist");
    }

    if (!name || !email || !password || !telephone) {
        throw new AppError(400, "Client need a name, email, password and telephone to be created.");
    }

    const hashedPassword = await hash(password, 10)

    const newClient = clientRepository.create({
        name,
        email,
        password: hashedPassword,
        telephone,
    })

    await clientRepository.save(newClient)

    return newClient
}
export default createClientService