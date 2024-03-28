export default class ClientRepo {
  async findClientById(clientId: String): Promise<ClientType | undefined> {
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
      `http://localhost:3001/cliente/${clientId}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as ClientType;
    } else {
      return undefined;
    }
  }

  async findAll(): Promise<ClientType[] | undefined> {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const header = new Headers({
      "content-type": "application/json",
      Authorization: token,
    });

    const options: RequestInit = {
      method: "GET",
      headers: header,
      mode: "cors",
    };

    const response = await fetch("http://localhost:3001/cliente/", options);

    if (response.ok) {
      return (await response.json()) as ClientType[];
    } else {
      return undefined;
    }
  }

  async createClient(client: ClientType): Promise<ClientType | undefined> {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const header = new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    });

    const options: RequestInit = {
      method: "POST",
      headers: header,
      mode: "cors",
      body: JSON.stringify(client),
    };

    const response = await fetch("http://localhost:3001/cliente/", options);

    if (response.ok) {
      return (await response.json()) as ClientType;
    } else {
      return undefined;
    }
  }

  async updateClient(
    clientId: String,
    client: ClientType
  ): Promise<ClientType | undefined> {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const header = new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    });

    const options: RequestInit = {
      method: "PUT",
      headers: header,
      mode: "cors",
      body: JSON.stringify(client),
    };

    const response = await fetch(
      `http://localhost:3001/cliente/${clientId}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as ClientType;
    } else {
      return undefined;
    }
  }

  async deleteClient(
    clientId: String,
    client: ClientType
  ): Promise<ClientType | undefined> {
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
      body: JSON.stringify(client),
    };

    const response = await fetch(
      `http://localhost:3001/cliente/${clientId}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as ClientType;
    } else {
      return undefined;
    }
  }
}
