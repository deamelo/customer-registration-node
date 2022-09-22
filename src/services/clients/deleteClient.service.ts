import AppDataSource from "../../data-source"
import {Client} from "../../entities/client.entity"
import {AppError} from "../../errors/appError"

const deleteClientService = async (id: string): Promise<void> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({id})

    if (!client) {
        throw new AppError (404, "Client not found")
    }

    await clientRepository.delete(client.id)

}
export default deleteClientService
