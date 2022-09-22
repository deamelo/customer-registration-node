import { Request, Response } from "express"
import createClientService from "../services/clients/createClient.service"
import loginClientService from "../services/clients/loginClient.service"
import listClientsService from "../services/clients/listClients.service"
import profileClientService from "../services/clients/profileClient.service"
import updateClientService from "../services/clients/updateClient.service"
import deleteClientService from "../services/clients/deleteClient.service"
import { instanceToPlain } from "class-transformer"


export const createClientController = async (req: Request, res: Response) => {

    const { name, email, password, telephone } = req.body
    const newClient = await createClientService({name, email, password, telephone})
    return res.status(201).json(instanceToPlain(newClient))
}

export const loginClientController = async (req: Request, res: Response) => {

    const { email, password } = req.body
    const token = await loginClientService({email, password})
    return res.status(200).json({token})
}

export const listClientsController = async (req: Request, res: Response) => {

    const clients = await listClientsService()
    return res.status(200).json(instanceToPlain(clients))
}

export const profileClientController = async (req: Request, res: Response) => {

    const {id} = req.user
    const client = await profileClientService(id)
    return res.status(200).json(instanceToPlain(client))
}

export const updateClientController = async (req: Request, res: Response) => {

    const {id} = req.user
    const client = await updateClientService(id, req.body)
    return res.status(200).json(instanceToPlain(client))
}

export const deleteClientController = async (req: Request, res: Response) => {

    const {id} = req.user
    await deleteClientService(id)
    return res.status(204).send()
}