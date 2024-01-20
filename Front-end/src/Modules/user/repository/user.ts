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
      `http://localhost:3001/funcionario/${userId}`,
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

    const response = await fetch("http://localhost:3001/funcionario/", options);

    if (response.ok) {
      return (await response.json()) as UserType[];
    } else {
      return undefined;
    }
  }
}
