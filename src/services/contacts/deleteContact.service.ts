import AppDataSource from "../../data-source"
import {Contact} from "../../entities/contact.entity"
import { AppError } from "../../errors/appError"

const deleteContactService = async (id: string): Promise<void> => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.findOneBy({id})

    if (!contact) {
        throw new AppError(404, "Contact not found")
    }

    await contactRepository.delete(id)
}
export default deleteContactService