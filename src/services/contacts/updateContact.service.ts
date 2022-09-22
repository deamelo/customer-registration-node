import AppDataSource from "../../data-source"
import { Client } from "../../entities/client.entity"
import {Contact} from "../../entities/contact.entity"
import { AppError } from "../../errors/appError"
import {IContactUpdate} from "../../interfaces/contacts"

const updateContactService = async (id: string, {name, email, telephone}: IContactUpdate): Promise<Contact> => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.findOneBy({id})

    if (!contact) {
        throw new AppError(404, "Contact not found")
    }

    name && (contact.name = name)
    email && (contact.email = email)
    telephone && (contact.telephone = telephone)

    await contactRepository.save({...contact})

    return contact
}
export default updateContactService
