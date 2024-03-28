import { Token } from "typescript";

export default class AuthRepo {
  async Login(LoginDto: Login): Promise<TokenResponse | undefined> {
    const header = new Headers({
      "Content-Type": "application/json",
    });

    const options: RequestInit = {
      method: "POST",
      headers: header,
      mode: "cors",
      body: JSON.stringify(LoginDto),
    };

    const response = await fetch("http://localhost:3001/login", options);

    if (response.ok) {
      return (await response.json()) as TokenResponse;
    } else {
      return undefined;
    }
  }
}
