import "reflect-metadata"
import "express-async-errors"
import express from "express"
import handleAppErrorMiddeware from "./middlewares/handleAppError"
import { appRoutes } from "./routes/index"


const app = express()

app.use(express.json())

appRoutes(app)

app.use(handleAppErrorMiddeware)


// const port = process.env.PORT || 3001

export default app