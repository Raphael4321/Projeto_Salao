// Importa o modelo Funcionario e a interface IFuncionario
import Funcionario, {IFuncionario} from "../Models/funcionario";
// Importa o bcrypt para criptografar senhas
import bcrypt from "bcrypt";

// Define a classe FuncionarioService
export class FuncionarioService{
    // Método estático para obter todos os funcionários
    static async getAllFunc(): Promise<Array<IFuncionario> | undefined>{
        try{
            // Obtém todos os funcionários usando o método find do modelo Funcionario
            const AllFunc: Array<IFuncionario> = await Funcionario.find({});
            AllFunc.forEach((item,index) => {
                item.senha = '';
        })
            // Retorna a lista de funcionários
            return AllFunc;
        }catch(err){
            // Se ocorrer um erro, exibe uma mensagem no console com o erro
            console.log(err);
        }
    }

    // Método estático para criar um novo funcionário
    static async createFunc(
        FuncionarioDto: IFuncionario // Dados do funcionário a ser criado
    ): Promise<IFuncionario | undefined >{
        try{

            const verifyEmail = await Funcionario.findOne({emnail : FuncionarioDto.email})

            if(verifyEmail) return undefined;

            // Criptografa a senha do funcionário usando o bcrypt
            const passhash = await bcrypt.hash(FuncionarioDto.senha, 10);


            // Cria um novo funcionário usando o modelo Funcionario e os dados do funcionário informados
            const funcionarioEntity = new Funcionario({
                nome: FuncionarioDto.nome,
                email: FuncionarioDto.email,
                senha: passhash, // Senha criptografada
                dataNascimento:FuncionarioDto.dataNascimento,
                dataAdmissao: FuncionarioDto.dataAdmissao,
                dataDemissao: FuncionarioDto.dataDemissao,
                obsDemissao: FuncionarioDto.obsDemissao,
                rua:FuncionarioDto.rua,
                bairro:FuncionarioDto.bairro,
                cep:FuncionarioDto.cep,
                foto:FuncionarioDto.foto,
                ativo: FuncionarioDto.ativo,
                salario: FuncionarioDto.salario,
                admin: FuncionarioDto.admin
            });
            // Salva o novo funcionário no banco de dados usando o método save do modelo Funcionario
            const savedFunc = await funcionarioEntity.save();
            // Retorna o funcionário criado
            return savedFunc;
        }catch(err){
            // Se ocorrer um erro, exibe uma mensagem no console com o erro
            console.log(err);
        }
    }

    // Método estático para atualizar um funcionário pelo ID
    static async updateFunc (
        id: string, // ID do funcionário a ser atualizado
        FuncionarioDto: IFuncionario // Dados do funcionário a serem atualizados
    ): Promise< IFuncionario|null|undefined>{
        try{


            if(FuncionarioDto.email){
                const verifyEmail = await Funcionario.findOne({emnail : FuncionarioDto.email})

                if(verifyEmail?._id != id){
                    return undefined
                }
            }
     

            // Verifica se a senha foi informada nos dados do funcionário a serem atualizados
            if(FuncionarioDto.senha){
                // Se a senha foi informada, criptografa a nova senha usando o bcrypt
                const changingPass = await bcrypt.hash(FuncionarioDto.senha, 10)
                // Atualiza a senha nos dados do funcionário com a nova senha criptografada
                FuncionarioDto.senha = changingPass;
                
            }
            // Atualiza o funcionário pelo ID usando o método findByIdAndUpdate do modelo Funcionario e os dados do funcionário informados
            const updatingFunc = await Funcionario.findByIdAndUpdate(id, FuncionarioDto);

            if(updatingFunc){
                // Se o funcionário foi atualizado com sucesso, obtém os dados atualizados do funcionário usando o método findById do modelo Funcionariodefinitions.
                const updatedFunc = await Funcionario.findById(id);
                // Retorna o funcionário atualizado
                return updatedFunc;
            }else{
                return undefined;
            }

        }catch(err){
            // Se ocorrer um erro, exibe uma mensagem no console com o erro
            console.log(err);
        }
    }

    // Método estático para excluir um funcionário pelo ID
    static async deleteFunc(
        id: string // ID do funcionário a ser excluído
    ): Promise<IFuncionario | null | undefined>{
        try{
            // Exclui o funcionário pelo ID usando o método findOneAndDelete do modelo Funcionariodefinitions.
            const deletedFunc = await Funcionario.findOneAndDelete({ _id: id});
            // Retorna o funcionário excluído
            return deletedFunc;
        }catch(err){
            // Se ocorrer um erro, exibe uma mensagem no console com o erro
            console.log(err);
        }
    }

    // Método estático para obter um funcionário pelo ID
    static async getFuncById(
        id: string // ID do funcionário a ser obtido
    ): Promise<IFuncionario | null | undefined>{
        try{
            // Obtém o funcionário pelo ID usando o método findById do modelo Funcionariodefinitions.
            const FuncById: IFuncionario | null = await Funcionario.findById(id);

            if(FuncById && FuncById.senha) {
                FuncById.senha = "";
            }

            // Retorna o funcionário obtido pelo ID
            return FuncById;
    
        }catch(err){
            // Se ocorrer um erro, exibe uma mensagem no console com o erro
            console.log(err)
        }
    }

}
