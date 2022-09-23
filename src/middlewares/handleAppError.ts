import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const handleAppErrorMiddeware = (error: Error, req: Request, res: Response, _: NextFunction) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            message: error.message
        })
    }
    // console.log("_______________________")
    // console.log(error.message)
    // console.log("_______________________")
    return res.status(500).json({
        message: "Internal server error"
    })
}

export default handleAppErrorMiddeware