export default class ServiceModule {
  async CreateService(data: ServicoType): Promise<ServicoType | undefined> {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const header = new Headers({
      "content-type": "application/json",
      authorization: token,
    });

    const options: RequestInit = {
      method: "POST",
      headers: header,
      mode: "cors",
      body: JSON.stringify(data),
    };

    const response = await fetch(`http://localhost:3001/servico/`, options);

    if (response.ok) {
      return (await response.json()) as ServicoType;
    } else {
      return undefined;
    }
  }

  async GetAllService(): Promise<ServicoReturnedType[] | undefined> {
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

    const response = await fetch(`http://localhost:3001/servico/`, options);

    if (response.ok) {
      return (await response.json()) as ServicoReturnedType[];
    } else {
      return undefined;
    }
  }

  async UpdateServico(
    idServico: string,
    servicoDTO: ServicoType
  ): Promise<ServicoReturnedType | undefined> {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const header = new Headers({
      "content-type": "application/json",
      authorization: token,
    });

    const options: RequestInit = {
      method: "PUT",
      headers: header,
      mode: "cors",
      body: JSON.stringify(servicoDTO),
    };

    const response = await fetch(
      `http://localhost:3001/servico/${idServico}`,
      options
    );

    if (response.ok) {
      return (await response.json()) as ServicoReturnedType;
    } else {
      return undefined;
    }
  }
}
