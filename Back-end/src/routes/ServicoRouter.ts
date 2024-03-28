import express, { Response, Request } from "express";
import { ServicoController } from "../Controller/ServicoController";
import { IServico } from "../Models/serviço_model";
import { authToken } from "../middlewares/authentication";

const ServicoRouter = express.Router();

ServicoRouter.get(
  "/servico",
  authToken,
  async (req: Request, res: Response) => {
    const alldata = await ServicoController.getAllSvc();
    if (alldata) {
      res.status(200).send(alldata);
    } else {
      res.sendStatus(404);
    }
  }
);

ServicoRouter.post(
  "/servico",
  authToken,
  async (req: Request, res: Response) => {
    const servicoDTO: IServico = req.body;
    const createdServico = await ServicoController.createService(servicoDTO);
    if (createdServico) {
      res.status(201).send(createdServico);
    } else {
      res.sendStatus(404);
    }
  }
);

ServicoRouter.get(
  "/servico/:id",
  authToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const servico = await ServicoController.getServiceById(id);
    if (servico) {
      res.status(200).send(servico);
    } else {
      res.sendStatus(404);
    }
  }
);

ServicoRouter.put(
  "/servico/:id",
  authToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const body: IServico = req.body;
    const updatedServico = await ServicoController.updateService(id, body);
    if (updatedServico) {
      res.status(200).send(updatedServico);
    } else {
      res.sendStatus(404);
    }
  }
);

ServicoRouter.delete(
  "/servico/:id",
  authToken,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedServico = await ServicoController.deleteService(id);
    if (deletedServico) {
      res.sendStatus(200).send(deletedServico);
    } else {
      res.sendStatus(404);
    }
  }
);

export default ServicoRouter;
