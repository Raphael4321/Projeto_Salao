// Importa o mongoose e os tipos Document e Model
import mongoose, { Document, Model } from "mongoose";

// Define a opção de depuração do mongoose como verdadeira
mongoose.set("debug", true);

// Define a interface ICliente que estende o tipo Document do mongoose
export interface ICliente extends Document {
  nome: string; // Nome do cliente
  email: string;
  dataNascimento: Date; // Data de nascimento do cliente
  rua: string; // Rua do cliente
  obs?: string; // Observações sobre o cliente (opcional)
  bairro: string; // Bairro do cliente
  cep: string; // CEP do cliente
  foto?: string; // Foto do cliente (opcional)
  ativo?: boolean; // Indica se o cliente está ativo (opcional)
}

// Define o esquema do cliente usando a interface ICliente
const clienteschema = new mongoose.Schema<ICliente>(
  {
    nome: { type: String, required: true }, // Nome é obrigatório
    email: { type: String, required: true },
    dataNascimento: { type: Date, required: true }, // Data de nascimento é obrigatória
    rua: { type: String, required: true }, // Rua é obrigatória
    obs: { type: String, required: false }, // Observações são opcionais
    bairro: { type: String, required: false }, // Bairro é opcional
    cep: { type: String, required: false },
    foto: { type: String, required: false }, // Foto é opcional
    ativo: { type: Boolean, default: true }, // Ativo é opcional e tem valor padrão verdadeiro
  },
  { versionKey: false }
); // Desativa a chave de versão

// Cria o modelo Cliente usando o esquema do cliente e a interface ICliente
const Cliente: Model<ICliente> = mongoose.model<ICliente>(
  "clientes", // Nome da coleção no banco de dados
  clienteschema // Esquema usado para criar o modelo
);

// Exporta o modelo Cliente como padrão
export default Cliente;
