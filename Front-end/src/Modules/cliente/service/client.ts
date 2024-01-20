import {clientRepo} from "../repository"

export default class ClientService{
    async findClientById(clientId: string) : Promise<ClientType | undefined>{
        const gettingClientById = clientRepo.findClientById(clientId);
        return gettingClientById;
    } 

    async findAll() : Promise<ClientType[] | undefined> {
        return clientRepo.findAll();
    }
}
