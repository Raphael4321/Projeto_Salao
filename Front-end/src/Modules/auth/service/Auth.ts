import { authRepo } from "../repository";

export default class Auth {
  async Login(LoginDto: Login): Promise<TokenResponse | undefined> {
    return authRepo.Login(LoginDto);
  }
}
