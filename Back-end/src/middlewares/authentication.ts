import { NextFunction, Request, Response } from "express";
import Jwt from 'jsonwebtoken';


export const authToken = (req: Request, res: Response, next: NextFunction) => {
    if(process.env.TOKEN_HEADER_KEY && process.env.JWT_SECRET_KEY){
        const token: string|undefined = req.headers[process.env.TOKEN_HEADER_KEY]?.toString();
        const secretKey = process.env.JWT_SECRET_KEY;

       if(token){
            Jwt.verify(token, secretKey,(err, infoId) => {

                if(err){
                    res.status(403).end();
                } else {
                    req.iduser = infoId;
                    next();
                }
            })
        } else {
            res.status(403).end();
        }
    } else {
        res.status(403).end();
    }
}
