interface Login {
  email: string;
  senha: string;
}

interface TokenResponse {
  email: string;
  token: string;
}

interface TokenDecode {
  id: string;
  iat: number;
}

interface UserType {
  _id: string;
  nome: string;
  email: string;
  senha: string;
  dataNascimento: Date;
  dataAdmissao: Date;
  dataDemissao?: Date;
  obsDemissao?: string;
  rua: string;
  bairro: string;
  cep: string;
  foto: string;
  ativo: boolean;
  salario: string;
  admin?: boolean;
}

interface ClientType {
  _id: string;
  nome: string;
  email: string;
  senha: string;
  dataNascimento: Date;
  rua: string;
  bairro: string;
  cep: string;
  foto: string;
  ativo: boolean;
}

interface ServicoType{
  _id: string;
  nome: string;
  descricao?: string;
  valor: number;
  tempoServico?:number;
  ativo: boolean;
  funcionario: string;
  cliente: string;
  status: number; //0 - > agendado ; 1 -> atendimento; 2 -> finalizado; 3 -> cancelado
}

interface ServicoReturnedType{
  _id: string;
  nome: string;
  descricao?: string;
  valor: number;
  tempoServico?:number;
  ativo: boolean;
  funcionario: UserType;
  cliente: ClientType;
  status: number; //0 - > agendado ; 1 -> atendimento; 2 -> finalizado; 3 -> cancelado 
}