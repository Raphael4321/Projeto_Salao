import { clientRepo } from "../repository";

export default class ClientService {
  async findClientById(clientId: string): Promise<ClientType | undefined> {
    const gettingClientById = clientRepo.findClientById(clientId);
    return gettingClientById;
  }

  async findAll(): Promise<ClientType[] | undefined> {
    return clientRepo.findAll();
  }

  async createClient(client: ClientType): Promise<ClientType | undefined> {
    return clientRepo.createClient(client);
  }

  async updateClient(
    clientId: string,
    client: ClientType
  ): Promise<ClientType | undefined> {
    return clientRepo.updateClient(clientId, client);
  }

  async deleteClient(
    clientId: string,
    client: ClientType
  ): Promise<ClientType | undefined> {
    return clientRepo.deleteClient(clientId, client);
  }
}
