import { loginSchema } from "../Utils/types";
import { LoginService } from "../Service/LoginService";

export class LoginController {
  static async login(loginDto: loginSchema): Promise<loginSchema | undefined> {
    const logedData = await LoginService.login(loginDto);
    return logedData;
  }
}
