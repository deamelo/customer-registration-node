import { Router } from "express";
import {createClientController, loginClientController, listClientsController, profileClientController, updateClientController, deleteClientController} from "../controllers/client.controller"
import authToken from "../middlewares/authToken.middleware";

const routes = Router();

export const clientRoutes = () => {

  routes.post("", createClientController)
  routes.post("/login", loginClientController)
  routes.get("", listClientsController)
  routes.get("/profile", authToken, profileClientController)
  routes.patch("", authToken, updateClientController)
  routes.delete("", authToken, deleteClientController)

  return routes
}