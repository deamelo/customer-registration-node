import { Router } from "express";
import { createContactController, deleteContactController, listContactsController, profileContactController, updateContactController } from "../controllers/contact.controller";
import authToken from "../middlewares/authToken.middleware"

const routes = Router()

export const contactRoutes = () => {
    routes.post("",authToken, createContactController)
    routes.get("", authToken, listContactsController)
    routes.get("/:id", authToken, profileContactController)
    routes.patch("/:id", authToken, updateContactController)
    routes.delete("/:id", authToken, deleteContactController)

    return routes
}