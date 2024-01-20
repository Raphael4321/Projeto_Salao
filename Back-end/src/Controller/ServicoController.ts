import Servico, { IServico } from "../Models/serviço_model";
import { ServicoService } from "../Service/ServicoService";

export class ServicoController {
  static async createService(
    servicoDTO: IServico
  ): Promise<IServico | undefined> {
    const createdData = await ServicoService.createService(servicoDTO);
    return createdData;
  }

  static async getAllSvc(): Promise<Array<IServico> | undefined> {
    const allData = await ServicoService.getAllService();
    return allData;
  }

  static async getServiceById(
    id: string
  ): Promise<IServico | undefined | null> {
    const data = await ServicoService.getServiceById(id);
    return data;
  }

  static async updateService(
    id: string,
    servicoDTO: IServico
  ): Promise<IServico | null | undefined> {
    const updatedServico = await ServicoService.updateService(id, servicoDTO);
    return updatedServico;
  }

  static async deleteService(id: string): Promise<IServico | null | undefined> {
    try {
      const deletedServico = await ServicoService.deleteService(id);
      return deletedServico;
    } catch (err) {
      console.log(err);
    }
  }
}
