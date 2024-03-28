import Servico, { IServico } from "../Models/serviço_model";
import Funcionario from "../Models/funcionario";
import Cliente from "../Models/cliente";

export class ServicoService {
  static async createService(
    servicoDTO: IServico
  ): Promise<IServico | undefined> {
    try {
      const foundFuncionario = await Funcionario.findById(
        servicoDTO.funcionario
      );
      const foundCliente = await Cliente.findById(servicoDTO.cliente);

      const newService: IServico = new Servico({
        nome: servicoDTO.nome,
        descricao: servicoDTO.descricao,
        valor: servicoDTO.valor,
        tempoServico: servicoDTO.tempoServico,
        ativo: servicoDTO.ativo,
        funcionario: foundFuncionario,
        cliente: foundCliente,
        status: servicoDTO.status,
      });

      const SavedService = await newService.save();

      return SavedService;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllService(): Promise<Array<IServico> | undefined> {
    try {
      const allDataService: Array<IServico> = await Servico.find({}).populate([
        { path: "funcionario" },
        { path: "cliente" },
      ]);
      return allDataService;
    } catch (err) {
      console.log(err);
    }
  }

  static async getServiceById(
    id: string
  ): Promise<IServico | null | undefined> {
    try {
      const service = await Servico.findById(id).populate([
        { path: "funcionario" },
        { path: "cliente" },
      ]);
      return service;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateService(
    id: string,
    servicoDTO: IServico
  ): Promise<IServico | null | undefined> {
    try {
      const updatedService = await Servico.findByIdAndUpdate(id, servicoDTO);
      return updatedService;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteService(id: string): Promise<IServico | null | undefined> {
    try {
      const deletedService = await Servico.findByIdAndDelete(id);

      return deletedService;
    } catch (err) {
      console.log(err);
    }
  }
}
