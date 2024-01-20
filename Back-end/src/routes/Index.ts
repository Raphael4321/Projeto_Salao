import express from "express";
import { Express, Request,Response } from "express";
import FuncionarioRouter from "./FuncionarioRouter";
import servicoRouter from "./ServicoRouter";
import ClientRouter from "./ClienteRouter"
import LoginRouter from "./LoginRouter"

export const routes = (app: Express) => {
    app.route("/").get((req: Request, res: Response)=> {
        res.status(200).json({message: "API Serviços"});
    });

app.use(express.json(), ClientRouter, FuncionarioRouter, servicoRouter, LoginRouter);
};