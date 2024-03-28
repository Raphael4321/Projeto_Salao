import express, { Response, Request } from "express";
import { ClientController } from "../Controller/ClienteController";
import { ICliente } from "../Models/cliente";
import { authToken } from "../middlewares/authentication";

const ClientRouter = express.Router();

ClientRouter.get("/cliente", authToken, async (req: Request, res: Response) => {
  const allClients = await ClientController.getAllClients();
  if (allClients) {
    res.status(200).send(allClients);
  } else {
    res.sendStatus(404);
  }

});

ClientRouter.get(
  "/cliente/:id",
  authToken,
  async (req: Request, res: Response) => {
    const idFromUser: string = req.params.id;
    const clientById = await ClientController.getClientById(idFromUser);
  }
);

ClientRouter.post(
  "/cliente",
  authToken,
  async (req: Request, res: Response) => {
    const clientFromUser: ICliente = req.body;
    const createdClient = await ClientController.createClient(clientFromUser);
    if (createdClient) {
      res.status(201).send(createdClient);
    } else {
      res.sendStatus(404);
    }
  }
);

ClientRouter.put(
  "/cliente/:id",
  authToken,
  async (req: Request, res: Response) => {
    const idFromUser: string = req.params.id;
    const clientData: ICliente = req.body;
    const updatedClient = await ClientController.updateClient(
      idFromUser,
      clientData
    );
    if (updatedClient) {
      res.status(200).send(updatedClient);
    } else {
      res.sendStatus(400);
    }
  }
);

ClientRouter.delete(
  "/cliente/:id",
  authToken,
  async (req: Request, res: Response) => {
    const idFromUser: string = req.params.id;
    const deletedClient = await ClientController.deleteClient(idFromUser);
    if (deletedClient) {
      res.status(200).send(deletedClient);
    } else {
      res.status(400);
    }
  }
);

export default ClientRouter;
