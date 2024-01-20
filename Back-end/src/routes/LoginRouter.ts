import express from "express";
import { loginSchema } from "../Utils/types";
import { Request, Response } from "express";
import { LoginController } from "../Controller/LoginController";

const LoginRouter = express.Router();

LoginRouter.post("/login", async (req: Request, res: Response) => { 

     const loginDto: loginSchema = req.body;

     const logedData = await LoginController.login(loginDto);
     if(logedData){
        res.status(200).send(logedData);
     }else{
        res.sendStatus(400);
     }

});

export default LoginRouter;