import { IfUnknown } from "mongoose";
import Funcionario, { IFuncionario } from "../Models/funcionario";
import { FuncionarioService } from "../Service/FuncionarioService";

export class FuncionarioController {
  static async getAllFunc(): Promise<Array<IFuncionario> | undefined> {
    const allFunc = await FuncionarioService.getAllFunc();
    return allFunc;
  }

  static async createFunc(
    FuncionarioDto: IFuncionario
  ): Promise<IFuncionario | undefined> {
    const createdData = await FuncionarioService.createFunc(FuncionarioDto);
    return createdData;
  }

  static async getFuncById(
    id: string
  ): Promise<IFuncionario | undefined | null> {
    const data = await FuncionarioService.getFuncById(id);
    return data;
  }

  static async updateFunc(
    id: string,
    Funcdata: IFuncionario
  ): Promise<IFuncionario | null | undefined> {
    const updatedFunc = await FuncionarioService.updateFunc(id, Funcdata);
    return updatedFunc;
  }

  static async deleteFunc(
    id: string
  ): Promise<IFuncionario | null | undefined> {
    try {
      const deletedFunc = await Funcionario.findOneAndDelete({ _id: id });
      return deletedFunc;
    } catch (err) {
      console.log(err);
    }
  }
}
