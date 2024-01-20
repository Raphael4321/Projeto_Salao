import * as React from "react";
import styles from "./styles.module.css";
import Button from "../button";
import Modal from "../modal";
import TableServico from "../table_servico";
import { useSelector } from "react-redux";
import { getLayoutDisposition } from "@/Redux/dataSlice";
import { servicoService } from "@/Modules/service_module/service";
import { clientService } from "@/Modules/cliente/service";
import { userService } from "@/Modules/user/service";
import CardServico from "../CardServico";

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
  const handleAddServico = (isOpen: Boolean) => {
    setOpenModal(isOpen);
  };

  const [clientData, setClientData] = React.useState<ClientType[]>([]);
  const [funcionarioData, setFuncionarioData] = React.useState<UserType[]>([]);
  const [servicoData, setServicoData] = React.useState<ServicoReturnedType[]>([]);

  // Adicione esta linha para buscar o estado do layout
  const currentLayoutState = useSelector(getLayoutDisposition);

  const getService = async () => {
    const servico = await servicoService.getAllService();

    if (servico && servico.length > 0) {
      setServicoData(servico);
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
  }, [props.type]);

  switch (props.type) {
    case typeTable.servico:
      return (
        <>
          {openModal ? <Modal setIsOpen={handleAddServico} /> : null}
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <div>
                <p className={styles.title}> Serviços cadastrados</p>
                <p>117 cadastrados</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => handleAddServico(true)}
                  backgroundcolor="#081225"
                  padding={[8, 50, 8, 50]}
                  borderRadius
                  color="#B5C2CA"
                  fontsize={19}
                  fontWeight={500}
                >
                  Cadastrar Serviço
                </Button>
              </div>
            </div>
            {currentLayoutState ? (<TableServico data={servicoData} />) : (<CardServico data = {servicoData}/>)}
          </div>
        </>
      );

    case typeTable.cliente:
      return <div></div>;
    case typeTable.funcionario:
      return <div></div>;
  }
}
