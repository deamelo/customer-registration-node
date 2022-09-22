import { Client } from "../../entities/client.entity"
import { IClientUpdate } from "../../interfaces/clients"
import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appError"
import {hashSync} from "bcryptjs"

const updateClientService = async (id: string, {name, email, password, telephone}: IClientUpdate): Promise<Client> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({id})

    if (!client) {
        throw new AppError (404, "Client not found")
    }

    name && (client.name = name)
    email && (client.email = email)
    password && (client.password = hashSync(password, 10))
    telephone && (client.telephone = telephone)

    await clientRepository.save({...client})

    return client
}
export default updateClientService
