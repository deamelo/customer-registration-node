import { IClientLogin } from "../../interfaces/clients"
import  AppDataSource from "../../data-source";
import {Client} from "../../entities/client.entity"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";

const loginUserService = async ({email,password}: IClientLogin) => {

    const clientRepository = AppDataSource.getRepository(Client)

    const client = await clientRepository.findOneBy({email})

    if (!client||!bcrypt.compareSync(password, client.password!)) {
      throw new AppError(403, "Wrong email/password")
    }

    const token = jwt.sign(
      {
        id: client.id
      },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "24h",
      });

    return token
}
export default loginUserService