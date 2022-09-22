import AppDataSource from "../../data-source"
import {Contact} from "../../entities/contact.entity"
import { AppError } from "../../errors/appError"

const profileContactService = async (id: string): Promise<Contact> =>  {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.findOneBy({id})

    if (!contact) {
        throw new AppError(404, "Contact not found")
    }

    return contact
}
export default profileContactService
