import AppDataSource from "../../data-source"
import {Contact} from "../../entities/contact.entity"
import {IContact} from "../../interfaces/contacts"
import {AppError} from "../../errors/appError"
import {Client} from "../../entities/client.entity"

const createContactService = async ({name, email, telephone, clientId}: IContact): Promise<Contact>=> {
    const contactRepository = AppDataSource.getRepository(Contact)

    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({id: clientId})

    if (!client) {
        throw new AppError (404, "Client not found")
    }

    const contact = await contactRepository.findOneBy({email})

    if (contact) {
        throw new AppError(400, "Email already exist")
    }

    if (!name || !email || !telephone || !clientId) {
        throw new AppError(400, "Contact need a name, email, telephone and clientId to be created.");
    }

    const newContact = contactRepository.create({
        name,
        email,
        telephone,
        client: client
    })

    await contactRepository.save(newContact)

    return newContact
}
export default createContactService

