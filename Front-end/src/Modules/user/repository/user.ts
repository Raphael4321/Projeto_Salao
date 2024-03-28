export default class UserRepo {
  async findUserById(userId: String): Promise<UserType | undefined> {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const header = new Headers({
      "content-type": "application/json",
      authorization: token,
    });

    const options: RequestInit = {
      method: "GET",
      headers: header,
      mode: "cors",
    };

    const response = await fetch(
      `http://localhost:3001/funcionario/obter/${userId}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as UserType;
    } else {
      return undefined;
    }
  }

  async findAll() {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    const header = new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    });

    const options: RequestInit = {
      method: "GET",
      headers: header,
      mode: "cors",
    };

    const response = await fetch(
      "http://localhost:3001/funcionario/obterTodos",
      options
    );

    if (response.ok) {
      return (await response.json()) as UserType[];
    } else {
      return undefined;
    }
  }

  async createUser(user: UserType): Promise<UserType | undefined> {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    const header = new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    });

    const options: RequestInit = {
      method: "POST",
      headers: header,
      body: JSON.stringify(user),
      mode: "cors",
    };

    const response = await fetch(
      "http://localhost:3001/funcionario/criar",
      options
    );

    if (response.ok) {
      return (await response.json()) as UserType;
    } else {
      return undefined;
    }
  }

  async updateUser(
    userId: String,
    user: UserType
  ): Promise<UserType | undefined> {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    const header = new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    });

    const options: RequestInit = {
      method: "PUT",
      headers: header,
      body: JSON.stringify(user),
      mode: "cors",
    };

    const response = await fetch(
      `http://localhost:3001/funcionario/atualizar/${userId}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as UserType;
    } else {
      return undefined;
    }
  }

  async deleteUser(userId: String): Promise<UserType | undefined> {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    const header = new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    });

    const options: RequestInit = {
      method: "DELETE",
      headers: header,
      mode: "cors",
    };

    const response = await fetch(
      `http://localhost:3001/funcionario/deletar/${userId}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as UserType;
    } else {
      return undefined;
    }
  }
}
