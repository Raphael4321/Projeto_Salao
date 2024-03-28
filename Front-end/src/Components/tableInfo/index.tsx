import * as React from "react";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import { getLayoutDisposition } from "@/Redux/dataSlice";
import { servicoService } from "@/Modules/service_module/service";
import { clientService } from "@/Modules/cliente/service";
import { userService } from "@/Modules/user/service";
import CardServico from "./servico/CardServico";
import TableCliente from "./cliente/table_Cliente";
import CardCliente from "./cliente/CardCliente";
import ModalCliente from "../modal/modalCliente";
import ModalFuncionario from "../modal/modalFuncionario";
import TableFuncionario from "./funcionario/table_funcionario";
import CardFuncionario from "./funcionario/CardFuncionario";
import Modal from "../modal/modalServico";
import TableServico from "./servico/table_servico";
import RenderContent from "./RenderContent";

export enum typeTable {
  servico = "servico",
  funcionario = "funcionario",
  cliente = "cliente",
}

type Props = {
  type: typeTable;
};

export default function TableInfo(props: Props) {
  const [openModal, setOpenModal] = React.useState<Boolean>(false);
  const handleAdd = (isOpen: Boolean) => {
    setOpenModal(isOpen);
  };

  const [clientData, setClientData] = React.useState<any[]>([]);
  const [funcionarioData, setFuncionarioData] = React.useState<any[]>([]);
  const [servicoData, setServicoData] = React.useState<any[]>([]);
  const [atualizar, setAtualizar] = React.useState<boolean>(false);

  const currentLayoutState = useSelector(getLayoutDisposition);

  const getService = async () => {
    const servico = await servicoService.getAllService();

    if (servico && servico.length > 0) {
      setServicoData(servico);
      console.log(servico);
    }
  };

  const getCliente = async () => {
    const cliente = await clientService.findAll();

    if (cliente && cliente.length > 0) {
      setClientData(cliente);
    }
  };

  const getFuncionario = async () => {
    const funcionario = await userService.findAll();

    if (funcionario && funcionario.length > 0) {
      setFuncionarioData(funcionario);
    }
  };

  React.useEffect(() => {
    switch (props.type) {
      case typeTable.servico:
        getService();
        break;
      case typeTable.cliente:
        getCliente();
        break;
      case typeTable.funcionario:
        getFuncionario();
        break;
    }
  }, [atualizar]);

  const AtualizarRender = () => {
    setAtualizar(!atualizar);
  };

  switch (props.type) {
    case typeTable.servico:
      return (
        <RenderContent
          openModal={openModal}
          handleAdd={handleAdd}
          data={servicoData}
          atualizar={AtualizarRender}
          currentLayoutState={currentLayoutState}
          title="Serviços cadastrados"
          buttonText="Cadastrar Serviço"
          ModalComponent={Modal}
          TableComponent={TableServico}
          CardComponent={CardServico}
        />
      );

    case typeTable.cliente:
      return (
        <RenderContent
          openModal={openModal}
          handleAdd={handleAdd}
          data={clientData}
          atualizar={AtualizarRender}
          currentLayoutState={currentLayoutState}
          title="Clientes cadastrados"
          buttonText="Cadastrar Cliente"
          ModalComponent={ModalCliente}
          TableComponent={TableCliente}
          CardComponent={CardCliente}
        />
      );
    case typeTable.funcionario:
      return (
        <RenderContent
          openModal={openModal}
          handleAdd={handleAdd}
          data={funcionarioData}
          atualizar={AtualizarRender}
          currentLayoutState={currentLayoutState}
          title="Funcionários cadastrados"
          buttonText="Cadastrar Funcionário"
          ModalComponent={ModalFuncionario}
          TableComponent={TableFuncionario}
          CardComponent={CardFuncionario}
        />
      );
  }
}
