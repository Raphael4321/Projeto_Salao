import Cliente, { ICliente } from "../Models/cliente";

export class ClientService {
  static async getAllClients(): Promise<Array<ICliente> | undefined> {
    try {
      const allClients: Array<ICliente> = await Cliente.find({});
      return allClients;
    } catch (err) {
      console.log(err);
    }
  }

  static async createClient(
    clientData: ICliente
  ): Promise<ICliente | undefined> {
    try {
      const newClient: ICliente = new Cliente({
        nome: clientData.nome,
        email: clientData.email,
        dataNascimento: clientData.dataNascimento,
        rua: clientData.rua,
        obs: clientData.obs,
        bairro: clientData.bairro,
        cep: clientData.cep,
        foto: clientData.foto,
        ativo: clientData.ativo,
      });

      const savedClient = await newClient.save();
      return savedClient;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteClient(id: string): Promise<ICliente | null | undefined> {
    try {
      const deletedClient = await Cliente.findOneAndDelete({ _id: id });
      return deletedClient;
    } catch (err) {
      console.log(err);
    }
  }

  static async getClientById(id: string): Promise<ICliente | null | undefined> {
    try {
      const clientById: ICliente | null = await Cliente.findById(id);
      return clientById;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateClient(
    id: string,
    clientData: ICliente
  ): Promise<ICliente | null | undefined> {
    try {
      const updatedClient = await Cliente.findByIdAndUpdate(id, clientData);

      if (updatedClient) {
        const updatedClientDetails = await Cliente.findById(id);
        return updatedClientDetails;
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
