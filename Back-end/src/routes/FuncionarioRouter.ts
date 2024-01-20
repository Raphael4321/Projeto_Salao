import express, {Response, Request} from "express";
import { FuncionarioService } from "../Service/FuncionarioService";
import { IFuncionario } from "../Models/funcionario";
import { authToken } from "../middlewares/authentication";

const FuncionarioRouter = express.Router();

FuncionarioRouter.get("/funcionario", authToken, async(req: Request, res:Response)=> {
    const allFuncionarios = await FuncionarioService.getAllFunc();
    if(allFuncionarios){
        res.status(200).send(allFuncionarios);
    }else{
        res.sendStatus(404);
    }
})

FuncionarioRouter.post("/funcionario", async(req: Request, res: Response) => {
    const funcionarioFromUser: IFuncionario = req.body;
    const createdFuncionario = await FuncionarioService.createFunc(funcionarioFromUser);
    if(createdFuncionario){
        res.status(201).send(createdFuncionario);
    }else{
        res.sendStatus(404);
    }
});

FuncionarioRouter.get("/funcionario/:id", authToken, async (req: Request, res: Response) =>{
    const id = req.params.id;
    const funcionarioById = await FuncionarioService.getFuncById(id);
    if(funcionarioById){
        res.status(200).send(funcionarioById);
    }else{
        res.sendStatus(404);
    }
})

FuncionarioRouter.put ("/funcionario/:id", authToken, async (req: Request, res: Response) =>{
    const id = req.params.id;
    const funcionarioDto: IFuncionario = req.body;
    const updatedFuncionario = await FuncionarioService.updateFunc(id, funcionarioDto);
    if(updatedFuncionario){
        res.status(200).send(updatedFuncionario);
    }else{
        res.sendStatus(404);
    }
})

FuncionarioRouter.delete("/funcionario/:id", authToken, async (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedFuncionario = await FuncionarioService.deleteFunc(id);
    if(deletedFuncionario){
        res.status(200).send(deletedFuncionario);
    }else{
        res.sendStatus(404);
    }
})

export default FuncionarioRouter;
