import Funcionario, { IFuncionario } from "../Models/funcionario";
import bcrypt from "bcrypt";

export class FuncionarioService {
  static async getAllFunc(): Promise<Array<IFuncionario> | undefined> {
    try {
      const AllFunc: Array<IFuncionario> = await Funcionario.find({});
      AllFunc.forEach((item, index) => {
        item.senha = "";
      });
      return AllFunc;
    } catch (err) {
      console.log(err);
    }
  }

  static async createFunc(
    FuncionarioDto: IFuncionario
  ): Promise<IFuncionario | undefined> {
    try {
      const verifyEmail = await Funcionario.findOne({
        email: FuncionarioDto.email,
      });

      if (verifyEmail) return undefined;

      const passhash = await bcrypt.hash(FuncionarioDto.senha, 10);

      const funcionarioEntity = new Funcionario({
        nome: FuncionarioDto.nome,
        email: FuncionarioDto.email,
        senha: passhash,
        dataNascimento: FuncionarioDto.dataNascimento,
        dataAdmissao: FuncionarioDto.dataAdmissao,
        dataDemissao: FuncionarioDto.dataDemissao,
        obsDemissao: FuncionarioDto.obsDemissao,
        rua: FuncionarioDto.rua,
        bairro: FuncionarioDto.bairro,
        cep: FuncionarioDto.cep,
        foto: FuncionarioDto.foto,
        ativo: FuncionarioDto.ativo,
        salario: FuncionarioDto.salario,
        admin: FuncionarioDto.admin,
      });

      const savedFunc = await funcionarioEntity.save();
      return savedFunc;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateFunc(
    id: string,
    FuncionarioDto: IFuncionario
  ): Promise<IFuncionario | null | undefined> {
    try {

      if (FuncionarioDto.senha) {
        const changingPass = await bcrypt.hash(FuncionarioDto.senha, 10);
        FuncionarioDto.senha = changingPass;
      }
      

      const updatingFunc = await Funcionario.findByIdAndUpdate(
        id,
        FuncionarioDto
      );

      if (updatingFunc) {
        const updatedFunc = await Funcionario.findById(id);
        return updatedFunc;
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
    }
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

  static async getFuncById(
    id: string
  ): Promise<IFuncionario | null | undefined> {
    try {
      const FuncById: IFuncionario | null = await Funcionario.findById(id);

      if (FuncById && FuncById.senha) {
        FuncById.senha = "";
      }

      return FuncById;
    } catch (err) {
      console.log(err);
    }
  }
}
