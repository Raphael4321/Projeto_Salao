// Importa o modelo Cliente e a interface ICliente
import Cliente, {ICliente} from "../Models/cliente";

// Define a classe ClientService
export class ClientService{
    // Método estático para obter todos os clientes
    static async getAllClients(): Promise<Array<ICliente>| undefined>{
        try{
            // Obtém todos os clientes usando o método find do modelo Cliente
            const allClients: Array<ICliente> = await Cliente.find({});
            // Retorna a lista de clientes
            return allClients;
        }catch(err){
            // Se ocorrer um erro, exibe uma mensagem no console com o erro
            console.log(err);
        }
    }

    // Método estático para criar um novo cliente
    static async createClient(
        clientData: ICliente // Dados do cliente a ser criado
    ): Promise<ICliente | undefined>{
        try{
            // Cria um novo cliente usando o modelo Cliente e os dados do cliente informados
            const newClient: ICliente = new Cliente({
                nome: clientData.nome,
                dataNascimento: clientData.dataNascimento,
                rua: clientData.rua,
                obs: clientData.obs,
                bairro: clientData.bairro,
                cep:clientData.cep,
                foto: clientData.foto,
                ativo: clientData.ativo
            });
            // Salva o novo cliente no banco de dados usando o método save do modelo Cliente
            const savedClient = await newClient.save();
            // Retorna o cliente criado
            return savedClient;
        }catch(err){
            // Se ocorrer um erro, exibe uma mensagem no console com o erro
            console.log(err);
        }
    }

    // Método estático para excluir um cliente pelo ID
    static async deleteClient(
        id: string // ID do cliente a ser excluído
    ): Promise<ICliente | null | undefined>{
        try{
            // Exclui o cliente pelo ID usando o método findOneAndDelete do modelo Cliente
            const deletedClient = await Cliente.findOneAndDelete({ _id: id});
            // Retorna o cliente excluído
            return deletedClient;
        }catch(err){
            // Se ocorrer um erro, exibe uma mensagem no console com o erro
            console.log(err);
        }
    }

    // Método estático para obter um cliente pelo ID
    static async getClientById(
        id: string // ID do cliente a ser obtido
    ): Promise<ICliente | null | undefined>{
        try{
            // Obtém o cliente pelo ID usando o método findById do modelo Cliente
            const clientById: ICliente | null = await Cliente.findById(id);
            // Retorna o cliente obtido pelo ID
            return clientById;
        }catch(err){
            // Se ocorrer um erro, exibe uma mensagem no console com o erro
            console.log(err)
        }
    }

    // Método estático para atualizar um cliente pelo ID
    static async updateClient(
        id: string, // ID do cliente a ser atualizado
        clientData: ICliente // Dados do cliente a serem atualizados
    ): Promise<ICliente|null|undefined>{
        try{
            // Atualiza o cliente pelo ID usando o método findByIdAndUpdate do modelo Cliente e os dados do cliente informados
            const updatedClient =await Cliente.findByIdAndUpdate(id, clientData);
            if(updatedClient){
                // Se o cliente foi atualizado com sucesso, obtém os dados atualizados do cliente usando o método findById do modelo Cliente
                const updatedClient = await Cliente.findById(id);
                // Retorna o cliente atualizado
                return updatedClient;
            }else{
                return undefined;
            }
        }catch(err){
            // Se ocorrer um erro, exibe uma mensagem no console com o erro
            console.log(err)
        }
    }
}
