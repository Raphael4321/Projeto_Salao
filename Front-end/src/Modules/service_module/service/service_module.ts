import { serviceModuleRepo } from "../repository";

export default class servicoService {
  async createServico(data: ServicoType): Promise<ServicoType | undefined> {
    return serviceModuleRepo.CreateService(data);
  }

  async getAllService(): Promise<ServicoReturnedType[] | undefined> {
    return serviceModuleRepo.GetAllService();
  }

  async updateServico(
    id: string,
    servicoDTO: ServicoType
  ): Promise<ServicoReturnedType | undefined> {
    return serviceModuleRepo.UpdateServico(id, servicoDTO);
  }
}
