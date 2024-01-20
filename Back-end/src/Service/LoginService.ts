import Funcionario from "../Models/funcionario";
import { generateToken } from "../Utils/generate_token";
import { loginSchema } from "../Utils/types";
import bcrypt from 'bcrypt';

export class LoginService{
    static async login(loginDto: loginSchema): Promise <loginSchema | undefined>{
        const funcLogin = await Funcionario.findOne({email: loginDto.email});
        
        if (!funcLogin || !loginDto.senha) {
            return undefined;
        }

        const comparingPassword = await bcrypt.compare(loginDto.senha, funcLogin.senha);
        
        if (!comparingPassword){
            return undefined;
        }

        const token = generateToken(funcLogin.id);

        if(!token){
            return undefined;
        }

        const generatingReturnData: loginSchema = {
            token: token,
            email:funcLogin.email,
        }

        return generatingReturnData;
    }
}
