import { Request, Response } from "express"
import { instanceToPlain } from "class-transformer"
import createContactService from "../services/contacts/createContact.service"
import listContactsService from "../services/contacts/listContact.service"
import profileContactService from "../services/contacts/profileContact.service"
import updateContactService from "../services/contacts/updateContact.service"
import deleteContactService from "../services/contacts/deleteContact.service"

export const createContactController = async (req: Request, res: Response) => {
    const {name, email, telephone, clientId} = req.body
    const contact = await createContactService({name, email, telephone, clientId})

    return res.status(201).json(instanceToPlain(contact))
}

export const listContactsController = async (req: Request, res: Response) => {

    const contacts = await listContactsService()
    return res.status(200).json(instanceToPlain(contacts))
}

export const profileContactController = async (req: Request, res: Response) => {
    const {id} = req.params
    const contact = await profileContactService(id)

    return res.status(200).json(instanceToPlain(contact))
}

export const updateContactController = async (req: Request, res: Response) => {
    const {id} = req.params
    const {name, email, telephone} = req.body
    const contact = await updateContactService(id, {name, email, telephone})

    return res.status(200).json(instanceToPlain(contact))
}

export const deleteContactController = async (req: Request, res: Response) => {
    const {id} = req.params
    await deleteContactService(id)

    return res.status(204).send()
}