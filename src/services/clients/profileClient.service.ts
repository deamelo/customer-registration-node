import { Client } from "../../entities/client.entity";
import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appError";

const profileClientService = async (id: string): Promise<Client> => {
    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({id})

    if (!client) {
        throw new AppError(404, "Client not found");
    }

    return client
}
export default profileClientService