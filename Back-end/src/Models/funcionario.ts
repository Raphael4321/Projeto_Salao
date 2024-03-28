// Importa o mongoose e os tipos Document, Model e Schema
import mongoose, { Document, Model, Schema } from "mongoose";

// Define a opção de depuração do mongoose como verdadeira
mongoose.set("debug", true);

// Define a interface IFuncionario que estende o tipo Document do mongoose
export interface IFuncionario extends Document {
  nome: string; // Nome do funcionário
  email: string; // Email do funcionário
  senha: string; // Senha do funcionário
  dataNascimento: Date; // Data de nascimento do funcionário
  dataAdmissao: Date; // Data de admissão do funcionário
  dataDemissao?: Date; // Data de demissão do funcionário (opcional)
  obsDemissao?: string; // Observações sobre a demissão do funcionário (opcional)
  rua: string; // Rua do funcionário
  bairro: string; // Bairro do funcionário
  cep: string; // CEP do funcionário
  foto?: string; // Foto do funcionário
  ativo: boolean; // Indica se o funcionário está ativo
  salario: string; // Salário do funcionário
  admin?: boolean;
}

// Define o esquema do funcionário usando a interface IFuncionario
const funcionarioSchema = new mongoose.Schema<IFuncionario>({
  nome: { type: String, required: true }, // Nome é obrigatório
  email: { type: String, required: true }, // Email é obrigatório
  senha: { type: String, required: true }, // Senha é obrigatória
  dataNascimento: { type: Date, required: true }, // Data de nascimento é obrigatória
  dataAdmissao: { type: Date, required: true }, // Data de admissão é obrigatória
  dataDemissao: { type: Date, required: false }, // Data de demissão é opcional
  obsDemissao: { type: String, required: false }, // Observações sobre a demissão são opcionais
  rua: { type: String, required: true }, // Rua é obrigatória
  bairro: { type: String, required: true }, // Bairro é obrigatório
  cep: { type: String, required: true }, // CEP é obrigatório
  foto: { type: String, required: false }, // Foto é opcional
  ativo: { type: Boolean, required: true }, // Ativo é obrigatório e tem valor padrão verdadeiro
  salario: { type: String, required: true }, // Salário é obrigatório
  admin: { type: Boolean, required: false, default: false },
});

// Cria o modelo Funcionario usando o esquema do funcionário e a interface IFuncionario
const Funcionario = mongoose.model<IFuncionario>(
  "funcionarios",
  funcionarioSchema
);

// Exporta o modelo Funcionario como padrão
export default Funcionario;
