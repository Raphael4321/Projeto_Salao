import Cliente, { ICliente } from "../Models/cliente";

import { ClientService } from "../Service/ClienteService";

export class ClientController {
  static async getAllClients(): Promise<Array<ICliente> | undefined> {
    const allClients = await ClientService.getAllClients();
    return allClients;
  }

  static async createClient(
    clientData: ICliente
  ): Promise<ICliente | undefined> {
    const createdClient = await ClientService.createClient(clientData);
    return createdClient;
  }

  static async getClientById(id: string): Promise<ICliente | null | undefined> {
    const clientById: ICliente | null | undefined =
      await ClientService.getClientById(id);
    return clientById;
  }
  
  static async updateClient(
    id: string,
    clientData: ICliente
  ): Promise<ICliente | null | undefined> {
    const updatedClient = await ClientService.updateClient(id, clientData);
    return updatedClient;
  }

  static async deleteClient(id: string): Promise<ICliente | null | undefined> {
    try {
      const deletedClient = await Cliente.findOneAndDelete({ _id: id });
      return deletedClient;
    } catch (err) {
      console.log(err);
    }
  }
}
